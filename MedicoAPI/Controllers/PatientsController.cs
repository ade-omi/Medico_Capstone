using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicoAPI.Data;
using MedicoAPI.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NuGet.Versioning;
using Microsoft.IdentityModel.Tokens;
using MedicoAPI.Models.DTO;
using Microsoft.Identity.Client;
using MedicoAPI.Models.DTO.Patient;
using MedicoAPI.Models.DTO.Prescription;

namespace MedicoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly MedicoAPIContext _context;

        public PatientsController(MedicoAPIContext context)
        {
            _context = context;
        }

        // LOGIN POST
        [HttpPost("Login")]
        public async Task<ActionResult<int>> Login([FromBody] LoginDTO loginInfo)
        {
            ModelState.AddModelError("Error", "InvalidCredentials");
            if (!string.IsNullOrEmpty(loginInfo.UserName) && !string.IsNullOrEmpty(loginInfo.Password))
            {
                try
                {
                    var patient = await _context.Patient.AsNoTracking()
                    .SingleOrDefaultAsync(pts => pts.UserName == loginInfo.UserName && pts.Password == loginInfo.Password);

                    if (patient != null) return Ok(new {PatientID = patient.PatientId});
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
        public async Task<ActionResult> PostPatient(PatientSignUpDTO newPatient)
        {
            if(ModelState.IsValid && !(await isRegisteredAlready(newPatient)))
            { 
                var patient = new Patient
                {
                    UserName = newPatient.UserName,
                    Email = newPatient.Email,
                    Password = newPatient.Password,
                    FirstName = newPatient.FirstName,
                    LastName = newPatient.LastName,
                    PhoneNumber = newPatient.PhoneNumber,
                    DateOfBirth = newPatient.DateOfBirth,
                    HealthCardNumber = newPatient.HealthCardNumber
                };

                _context.Patient.Add(patient);
                await _context.SaveChangesAsync();

                return Ok();
            }
            ModelState.AddModelError("Error", "Useralreadyexists");
            return BadRequest(ModelState);
        }

        [HttpGet("Dashboard")]
        public async Task<ActionResult<PatientDashboardDTO>> GetPatientDashboardData(int patientID)
        {
            var todaysDate = DateOnly.FromDateTime(DateTime.Today);
            var currentTime = TimeOnly.FromDateTime(DateTime.Now);

            if (PatientExists(patientID))
            {
                PatientDashboardDTO patientDashBoard = new();
                patientDashBoard.Appointments = await _context.Appointment.AsNoTracking()
                                                .Where(app => app.PatientId == patientID && 
                                                (app.AppmntDate > todaysDate && app.AppmntTime > currentTime))
                                                .Include(app => app.Doctor)
                                                .Select(app =>
                                                    new PatientDashBoardAppointmentDTO
                                                    {
                                                        AppointmentId = app.AppointmentId,
                                                        Reason = app.Reason,
                                                        DoctorFullName = app.Doctor.DoctorName,
                                                        AppmntDate = app.AppmntDate,
                                                        AppmntTime = app.AppmntTime
                                                    }
                                                ).ToListAsync();

                patientDashBoard.Prescriptions = await _context.Prescription.AsNoTracking()
                                                .Where(pres => pres.PatientId == patientID)
                                                .Select(pres =>
                                                     new PatientDashboardPrescription
                                                     {
                                                        PrescriptionId = pres.PrescriptionId,
                                                        PrescriptionContent = pres.PrescriptionContent,
                                                        IssueDate = pres.IssueDate,
                                                        DoctorName = pres.Doctor.DoctorName
                                                     }
                                                ).ToListAsync();
                
                return Ok(patientDashBoard);
            }
            ModelState.AddModelError("Error", "UserDoesNotExist");
            return BadRequest(ModelState);
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _context.Patient.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            return patient;
        }

        [HttpPut("{id}/Update")]
        public async Task<IActionResult> PutPatient(int id, PatientDTO patient)
        {
            string code = "Error";
            string error = "PatientMayNotExists";
            if (id != patient.PatientId)
            {
                ModelState.AddModelError(code, error);
                return BadRequest(ModelState);
            }

           if(ModelState.IsValid)
           {
                var pt = await _context.Patient.FindAsync(patient.PatientId);  
                if(pt != null)
                {
                    pt.FirstName = patient.FirstName;
                    pt.LastName = patient.LastName;
                    pt.Email = patient.Email;
                    pt.PhoneNumber = patient.PhoneNumber;
                    pt.DateOfBirth = patient.DateOfBirth;
                    pt.HealthCardNumber = patient.HealthCardNumber;
                }
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PatientExists(id))
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



        // RETURNS A LIST OF DOCTORS THAT FOR THE PATIENT TO SELECT FROM DURING APPOINTMENT CREATION
        [HttpGet("GetAllDoctors")]
        public async Task<ActionResult<List<Counterparts>>> GetAllDoctors()
        {
            return await _context.Doctor.AsNoTracking()
                                        .Select(docs =>
                                          new Counterparts
                                          {
                                              ID = docs.DoctorId,
                                              Name = docs.DoctorName
                                          }
                                        )
                                        .ToListAsync();
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patient.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patient.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return _context.Patient.Any(e => e.PatientId == id);
        }
  
        //check whether patient already has an account
        private async Task<bool> isRegisteredAlready(PatientSignUpDTO newPatient)
        {
            var patientExists = await _context.Patient.AsNoTracking().AnyAsync(p =>
            p.UserName == newPatient.UserName ||
            p.Email == newPatient.Email ||
            p.PhoneNumber == newPatient.PhoneNumber ||
            p.HealthCardNumber == newPatient.HealthCardNumber);

            return patientExists;
        }

       /* //ENDPOINTS THAT ARE NOT NEEDED FOR NOW

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatient()
        {
            return await _context.Patient.AsNoTracking().ToListAsync();
        }
       */
    }
}
