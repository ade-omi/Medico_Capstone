using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicoAPI.Data;
using MedicoAPI.Models;
using MedicoAPI.Models.DTO.Appointment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using MedicoAPI.Models.DTO.Doctor;
using Newtonsoft.Json.Linq;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Net;

namespace MedicoAPI.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class AppointmentsController : ControllerBase
    {
        private readonly MedicoAPIContext _context;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient = new HttpClient();

        public AppointmentsController(MedicoAPIContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpGet("Proximity")]
        public async Task<ActionResult<List<DoctorProximity>>> DoctorsInTheVicinity(string patientAddress, int distanceInKM = 5)
        {
            if (!string.IsNullOrWhiteSpace(patientAddress))
            {
                //return the doctors in the vicinity of the address with order of closest to farthest
                return Ok(await ProximityCalculator(patientAddress, distanceInKM));
            }
            else {
                var patientID = User.Claims.FirstOrDefault(claims => claims.Type == "sub")!.Value;
                var ptAddress = await _context.Patient.AsNoTracking()
                                    .Where(patient => patient.PatientId == patientID)
                                    .Select(pt => pt.PatientAddress)
                                    .FirstAsync();

                // call the function that evaluates the closest doctor in the vicinity of an address
                return Ok(await ProximityCalculator(ptAddress, distanceInKM));
            }
        }

        // CHECKS AVAILABLE TIMESLOTS OF A SELECTED DOCTOR FOR A PERIOD OF TIME
        [HttpGet("Availability")]
        public async Task<ActionResult<Dictionary<DateOnly, List<TimeOnly>>>> GetDoctorAvailability(string doctorID)
        {
            var doctorExists = _context.Doctor.Any(docs => docs.DoctorId == doctorID);

            if (!doctorID.IsNullOrEmpty() && doctorExists)
            {
                var DocSched2Weeks = await DoctorTimeslots(doctorID);

                if (DocSched2Weeks != null)
                {
                    return Ok(DocSched2Weeks);
                }
            }
            ModelState.AddModelError("Error", "DoctorMayNotExists");
            return BadRequest(ModelState);
        }


        // POST: api/Appointments
        [HttpPost("Create")]
        public async Task<ActionResult> PostAppointment(AppointmentDTOComplete newAppointment)
        {
            if (ModelState.IsValid)
            {
                if (await isDoctorAvailable(newAppointment.DoctorID, newAppointment.AppmntDate, newAppointment.AppmntTime))
                {
                    var appointment = new Appointment
                    {
                        PatientId = newAppointment.PatientID,
                        DoctorId = newAppointment.DoctorID,
                        Reason = newAppointment.Reason,
                        AppmntDate = newAppointment.AppmntDate,
                        AppmntTime = newAppointment.AppmntTime
                    };

                    _context.Appointment.Add(appointment);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                ModelState.AddModelError("Error", "Doctor is not available on the selected time slot. Please select another one");
                return BadRequest(ModelState);
            }
            return BadRequest();
        }


        // DELETE: api/Appointments/5
        [HttpDelete("Cancel/{id}")]
        public async Task<IActionResult> DeleteAppointment(string appointmentID)
        {
            var role = User.Claims.FirstOrDefault(claims => claims.Type == "cognito:groups")!.Value[0];
            var appointment = await _context.Appointment.FindAsync(appointmentID);

            if (appointment == null)
            {
                return NotFound();
            }

            if (role.ToString() == "patient")
            {
                var appointmentDateTime = appointment.AppmntDate.ToDateTime(appointment.AppmntTime);
                if (DateTime.Now.Add(new TimeSpan(24)) == appointmentDateTime)
                {
                    return Forbid("Appointment cancellation is not allowed 24 hrs. of the appointment date"); 
                }
            }

            _context.Appointment.Remove(appointment);
            await _context.SaveChangesAsync();
            return NoContent();         
        }


        //CHECKS WHETHER THE DOCTOR IS AVAIALBLE 
        //USAGE - SECONDARY CHECK AFTER AN APPOINTMENT CONFIRMED TO AVOID DUPLICATES IF AN 'INSERT-RACE' WERE TO HAPPEN.
        private async Task<bool> isDoctorAvailable(string doctorID, DateOnly date, TimeOnly time)
        {
            var doctorTimeSlots = await DoctorTimeslots(doctorID);
            if (doctorTimeSlots != null)
            {
                if (doctorTimeSlots.ContainsKey(date) && doctorTimeSlots[date].Contains(time))
                {
                    return true;
                }
                return false;
            }
            return false;
        }

        private async Task<Dictionary<DateOnly, List<TimeOnly>>> DoctorTimeslots(string doctorID)
        {
            //THE PERIOD OF TIME IN WHICH THE TIMESLOTS ARE CHECKED
            var todaysDate = DateOnly.FromDateTime(DateTime.Today);
            var endDate = todaysDate.AddDays(14);

            //DOCTOR WORKING HOURS
            //REFACTOR THIS TO DYNAMICALLY SET THE WORKING HOURS OF A DOCTOR
            var startOfWorkingDay = new TimeOnly(9, 0);
            var endOfWorkingDay = new TimeOnly(17, 0);

            //RETRIEVES ALL THE BOOKED APPOINTMENTS OF A D`OCTOR
            var bookedAppointments = await _context.Appointment.AsNoTracking()
                                                   .Where(appmnt => appmnt.DoctorId == doctorID && appmnt.AppmntDate >= todaysDate && appmnt.AppmntDate <= endDate)
                                                   .ToListAsync();

            //CREATES A DICTIONARY WITH ITEMS IN A PAIR OF [DAY (key) - WORKING HOURS / LIST OF TIMESLOTS] 
            var timeslot = new Dictionary<DateOnly, List<TimeOnly>>();

            //LOOPS FROM THE STARTING / PRESESNT DAY UNTIL END DATE AND INCREMENT BY ONE DAY
            for (var date = todaysDate; date <= endDate; date = date.AddDays(1))
            {
                //CREATES A TIMESLOT LIST FROM 9AM - 5PM (WORKING HOURS) AND POPULATE IT IN A 30 MINS INTERVAL
                var dailySlots = new List<TimeOnly>();
                var currentTime = startOfWorkingDay;
                while (currentTime < endOfWorkingDay)
                {
                    dailySlots.Add(currentTime);
                    currentTime = currentTime.Add(new TimeSpan(0, 30, 0));
                }

                //INSERTS THE DAY'S TIME SLOTS IN THE DICTIONARY WITH A KEY OF LOOP DATE
                timeslot.Add(date, dailySlots);
            }

            //HAND PICKING EACH TAKEN TIMESLOTS IN THE DICTIONARY BY CROSS CHECKING IT WITH THE SCHEDULED APPOINTMENT
            foreach (var appointment in bookedAppointments)
            {
                if (timeslot.ContainsKey(appointment.AppmntDate))
                {
                    timeslot[appointment.AppmntDate].Remove(appointment.AppmntTime);
                }
            }

            return timeslot;
        }

        private async Task<List<DoctorProximity>> ProximityCalculator(string origin, int distanceInKM)
        {
            // 1. GET ALL DOCTORS STORE THEM INTO AN LIST
            var listOfDoctors = await _context.Doctor.AsNoTracking()
                                .Select(doctor => new DoctorProximity
                                {
                                    DoctorId = doctor.DoctorId,
                                    DoctorName = doctor.DoctorName,
                                    Specialty = doctor.Specialty,
                                    ClinicAddress = doctor.ClinicAddress
                                }).ToListAsync();

            // 2. GET ALL THEIR ADDRESSES FROM THE LIST
            var destinations = listOfDoctors.Select(doctor => doctor.ClinicAddress).ToArray();

            // FORMAT THE ADDRESSES INTO GOOGLE API CAN UNDERSTAND
            string destinationsFormatted = string.Join("|", destinations);


            // 3. QUERY GOOGLE DISTANCE MATRIX API SEND ALL DESTINATION ADDRESS ('listOfAddreses') WITH AN ORIGIN OF 'patientAddress'
            var requestUrl = $"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destinationsFormatted}&key={_config["GoogleAPIKey"]}";
            var response = await _httpClient.GetStringAsync(requestUrl);

            // 4. DESERIALIZE RESPONSE FROM THE QUERY AND TURN INTO A LIST
            var deserialized = JObject.Parse(response);
            var elements = deserialized["rows"][0]["elements"]
                           .Select(result => new
                           {
                               DistanceInKm = (string) result["distance"]["text"],
                               Status = (string) result["status"]
                           }).ToList();

            // 5. INSERT THE EACH DISTANCE TO THE 'listOfDoctors' (THE ORDER OF THE RESPONSE IS CONSISTENT WITH QUERY)
            //   CHECK IF STATUS IS OK AND INSERT, IF NOT THEN USE 'CONTINUE' KEYWORD TO SKIP
            for (int i = 0; i < listOfDoctors.Count; i++)
            {
                if (elements[i].Status != "OK")
                {
                    continue;
                }
                listOfDoctors[i].EstimatedDistance = elements[i].DistanceInKm ?? "Unavailable";
            }


            // 6. SORT THE LIST AFTER DISTANCE ARE ADDED
            listOfDoctors.OrderBy(doctors => Convert.ToDouble(doctors.EstimatedDistance));
            listOfDoctors.RemoveAll(doctors => Convert.ToDouble(doctors.EstimatedDistance) > distanceInKM);

            if (listOfDoctors.Count > 15)
            {
                listOfDoctors.RemoveRange(15, listOfDoctors.Count - 15);
            }

            // 7. RETURN LIST
            return listOfDoctors;
        }


    }
}





















































// ENDPOINTS THAT ARE NOT NEEDED FOR NOW.

/*
// GET: api/Appointments
[HttpGet]
public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointment()
{

    return await _context.Appointment.AsNoTracking().ToListAsync();
}


private bool AppointmentExists(int id)
{
    return _context.Appointment.Any(e => e.AppointmentId == id);
}


// GET: api/Appointments/5
[HttpGet("{id}")]
public async Task<ActionResult<Appointment>> GetAppointment(int id)
{
    var appointment = await _context.Appointment.FindAsync(id);

    if (appointment == null)
    {
        return NotFound();
    }

    return appointment;
}

// PUT: api/Appointments/5
[HttpPut("{id}")]
public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
{
    if (id != appointment.AppointmentId)
    {
        return BadRequest();
    }

    _context.Entry(appointment).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!AppointmentExists(id))
        {
            return NotFound();
        }
        else
        {
            throw;
        }
    }

    return NoContent();
}

 */