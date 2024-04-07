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

namespace MedicoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly MedicoAPIContext _context;

        public AppointmentsController(MedicoAPIContext context)
        {
            _context = context;
        }


        [HttpGet("DoctorAvailability")]
        public async Task<ActionResult<Dictionary<DateOnly, List<TimeOnly>>>> GetDoctorAvailability(int doctorID)
        {
            var doctorExists = _context.Doctor.Any(docs => docs.DoctorId == doctorID);
            if(doctorID > 0 && doctorExists)
            {
                var DocSched2Weeks = await DoctorsAvailability(doctorID);

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
            if(ModelState.IsValid)
            {
                if(await isDoctorAvailable(newAppointment.DoctorID, newAppointment.AppmntDate, newAppointment.AppmntTime))
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
                ModelState.AddModelError("Error", "DoctorNotAvailable");
                return BadRequest(ModelState);
            }
            return BadRequest();
        }

        // DELETE: api/Appointments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointment.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointment.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointment.Any(e => e.AppointmentId == id);
        }

        private async Task<Dictionary<DateOnly, List<TimeOnly>>> DoctorsAvailability(int doctorID)
        {
            var todaysDate = DateOnly.FromDateTime(DateTime.Today);
            var endDate = todaysDate.AddDays(14);

            var startOfWorkingDay = new TimeOnly(9, 0);
            var endOfWorkingDay = new TimeOnly(17, 0);

            var bookedAppointments = await _context.Appointment.AsNoTracking()
                                                   .Where(appmnt => appmnt.DoctorId == doctorID && appmnt.AppmntDate >= todaysDate && appmnt.AppmntDate <= endDate)
                                                   .ToListAsync();

            var availability = new Dictionary<DateOnly, List<TimeOnly>>();

            for(var date = todaysDate; date <= endDate; date = date.AddDays(1))
            {
                var dailySlots = new List<TimeOnly>();
                var currentTime = startOfWorkingDay;
                while (currentTime < endOfWorkingDay)
                {
                    dailySlots.Add(currentTime);
                    currentTime = currentTime.Add(new TimeSpan(0, 30, 0)); 
                }

                availability.Add(date, dailySlots);
            }

            foreach (var appointment in bookedAppointments)
            {
                if (availability.ContainsKey(appointment.AppmntDate))
                {
                    availability[appointment.AppmntDate].Remove(appointment.AppmntTime);
                }
            }

            return availability;
        }


        private async Task<bool> isDoctorAvailable(int doctorID, DateOnly date, TimeOnly time)
        {
            var docScheduleFor2weeks = await DoctorsAvailability(doctorID);

            if(docScheduleFor2weeks != null)
            {
                if(docScheduleFor2weeks.ContainsKey(date) && docScheduleFor2weeks[date].Contains(time))
                {
                    return true;
                }
                return false;
            }
            return false;
        }





        

        // ENDPOINTS THAT ARE NOT NEEDED FOR NOW.

        /*
        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointment()
        {
            
            return await _context.Appointment.AsNoTracking().ToListAsync();
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
    }
}
