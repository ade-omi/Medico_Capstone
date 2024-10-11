/*using System;
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
using Microsoft.AspNetCore.Authorization;

namespace MedicoAPI.Controllers
{
    [Authorize(Roles = "patient")]
    [Route("[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly MedicoAPIContext _context;

        public PatientsController(MedicoAPIContext context)
        {
            _context = context;
        }

        [HttpPost("Sign-up")]
        public async Task<ActionResult> PostPatient(PatientSignUpDTO newPatient)
        {
            if (ModelState.IsValid && !(await isRegisteredAlready(newPatient)))
            {
                var patient = new Patient
                {
                    Email = newPatient.Email,
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
        public async Task<ActionResult<PatientDashboardDTO>> GetPatientDashboardData()
        {
            var todaysDate = DateOnly.FromDateTime(DateTime.Today);
            var currentTime = TimeOnly.FromDateTime(DateTime.Now);
            var patientID = User.Claims.FirstOrDefault(claims => claims.Type == "sub")!.Value;

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

            if (ModelState.IsValid)
            {
                var pt = await _context.Patient.FindAsync(patient.PatientId);
                if (pt != null)
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


        // MOVE THIS TO DOCTOR
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

        private bool PatientExists(string patientID)
        {
            return _context.Patient.Any(e => e.PatientId == patientID);
        }

    }
}

*/