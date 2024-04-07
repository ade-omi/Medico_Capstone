using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicoAPI.Data;
using MedicoAPI.Models;
using MedicoAPI.Models.DTO;
using MedicoAPI.Models.DTO.Doctor;
using MedicoAPI.Models.DTO.Patient;

namespace MedicoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly MedicoAPIContext _context;

        public DoctorsController(MedicoAPIContext context)
        {
            _context = context;
        }


        [HttpPost("Login")]
        public async Task<ActionResult<int>> Login([FromBody] LoginDTO loginInfo)
        {
            ModelState.AddModelError("Error", "InvalidCredentials");
            if (!string.IsNullOrEmpty(loginInfo.UserName) && !string.IsNullOrEmpty(loginInfo.Password))
            {
                try
                {
                    var doctor = await _context.Doctor.AsNoTracking()
                    .SingleOrDefaultAsync(doc => doc.Username == loginInfo.UserName && doc.Password == loginInfo.Password);

                    if (doctor != null) return Ok(new { DoctorID = doctor.DoctorId });
                    else return BadRequest(ModelState);
                }
                catch (InvalidOperationException)
                {
                    return BadRequest(ModelState);
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost("Sign-up")]
        public async Task<ActionResult<Doctor>> DoctorSignup(DoctorSignUpDTO newDoc)
        {
            if (ModelState.IsValid && !(await IsRegisteredAlready(newDoc.DoctorCPSONum)))
            {
                var doctor = new Doctor
                {
                    DoctorName = newDoc.DoctorName,
                    DoctorPhone = newDoc.DoctorPhone,
                    Email = newDoc.Email,
                    Username = newDoc.Username,
                    Password = newDoc.Password,
                    DoctorCPSONum = newDoc.DoctorCPSONum,
                };
                _context.Doctor.Add(doctor);
                await _context.SaveChangesAsync();
                return Ok();
            }
            ModelState.AddModelError("Error", "Useralreadyexists");
            return BadRequest(ModelState);
        }



        [HttpGet("Dashboard")]
        public async Task<ActionResult<DoctorDashboardDTO>> DoctorDashboard(int doctorID)
        {
            var todaysDate = DateOnly.FromDateTime(DateTime.Today);
            var currentTime = TimeOnly.FromDateTime(DateTime.Now);

            if (DoctorExists(doctorID))
            {
                DoctorDashboardDTO doctorDashboardDTO = new();
                doctorDashboardDTO.Appointments = await _context.Appointment.AsNoTracking()
                                                .Where(app => app.DoctorId == doctorID
                                                && (app.AppmntDate > todaysDate && app.AppmntTime > currentTime))
                                                .Include(app => app.Patient)
                                                .Select(app =>
                                                    new AppointmentDoctorDashboardDTO
                                                    {
                                                        AppointmentId = app.AppointmentId,
                                                        Reason = app.Reason,
                                                        PatientFullName = app.Patient.FirstName + " " + app.Patient.LastName,
                                                        AppmntDate = app.AppmntDate,
                                                        AppmntTime = app.AppmntTime
                                                    }
                                                ).ToListAsync();

                doctorDashboardDTO.Patients = await _context.Prescription.AsNoTracking()
                                                .Where(pres => pres.DoctorId == doctorID)
                                                .Include(P => P.Patient)
                                                .Select(pres =>
                                                     new PatientDTO
                                                     {
                                                         PatientId = pres.PatientId,
                                                         FirstName = pres.Patient.FirstName,
                                                         LastName = pres.Patient.LastName,
                                                         Email = pres.Patient.Email,
                                                         PhoneNumber = pres.Patient.PhoneNumber,
                                                         DateOfBirth = pres.Patient.DateOfBirth,
                                                         HealthCardNumber = pres.Patient.HealthCardNumber,
                                                     }
                                                ).ToListAsync();

                return Ok(doctorDashboardDTO);
            }
            ModelState.AddModelError("Error", "DoctorMayNotexists");
            return BadRequest(ModelState);
        }


        // PUT: api/Doctors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> PutDoctor(int id, DoctorDTO doctor)
        {
            string code = "Error";
            string error = "PatientMayNotExists";
            if (id != doctor.DoctorId)
            {
                ModelState.AddModelError(code, error);
                return BadRequest(ModelState);
            }

            if (ModelState.IsValid)
            {
                var doc = await _context.Doctor.FindAsync(doctor.DoctorId);
                if (doc != null)
                {
                    doc.DoctorName = doctor.DoctorName;
                    doc.DoctorPhone = doctor.DoctorPhone;
                }
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DoctorExists(id))
                    {
                        ModelState.AddModelError(code, "SomethingWentWrong");
                        return BadRequest(ModelState);
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok();
            }
            ModelState.AddModelError(code, error);
            return BadRequest(ModelState);
        }


        //RETURNS A LIST OF PATIENTS THAT HAD AN APPOINTMENT WITH THE DOCTOR 
        [HttpGet("Patients")]
        public async Task<ActionResult<List<Counterparts>>> GetPatients(int doctorID)
        {
            if(doctorID > 0 && DoctorExists(doctorID))
            { 
                var todaysDate = DateOnly.FromDateTime(DateTime.Today);
                var currentTime = TimeOnly.FromDateTime(DateTime.Now);

                var patientList = await _context.Appointment.AsNoTracking()
                              .Where(apps => apps.DoctorId == doctorID && apps.AppmntDate <= todaysDate && apps.AppmntTime < currentTime)
                              .Include(apps => apps.Patient)
                              .Select(apps =>
                                new Counterparts
                                {
                                    ID = apps.Patient.PatientId,
                                    Name = $"{apps.Patient.FirstName} {apps.Patient.LastName}" 
                                }
                              ).Distinct().ToListAsync();

                return Ok(patientList);
            }

            ModelState.AddModelError("Error", "DoctorDoesNotExists");
            return BadRequest(ModelState);
        }












        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctor.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            _context.Doctor.Remove(doctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorExists(int id)
        {
            return _context.Doctor.Any(e => e.DoctorId == id);
        }

        private async Task<bool> IsRegisteredAlready(string CPSONum)
        {
            var doctorExists = await _context.Doctor.AsNoTracking().AnyAsync(doc =>
                doc.DoctorCPSONum == CPSONum
            );

            return doctorExists;
        }

        // ENDSPOITNS THAT ARE NOT NEEDED RIGHT NOW
        /*
         
        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctor()
        {
            return await _context.Doctor.ToListAsync();
        }

        [HttpGet("{doctorID}/Prescriptives")]
        public async Task<ActionResult<IEnumerable<Prescription>>> GetDoctorPrescriptionIssueHistory(int doctorID)
        {
            return await _context.Prescription.Where(P => P.DoctorId == doctorID).ToListAsync();
        }

        
        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            var doctor = await _context.Doctor.FindAsync(id);

            if (doctor == null)
            {
                return NotFound();
            }

            return doctor;
        }

         */
    }
}
