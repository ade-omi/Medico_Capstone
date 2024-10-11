/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicoAPI.Data;
using MedicoAPI.Models;
using MedicoAPI.Models.DTO.Prescription;
using Microsoft.OpenApi.Any;
using Microsoft.AspNetCore.Authorization;

namespace MedicoAPI.Controllers
{
    [Authorize(Roles = "doctor")]
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionsController : ControllerBase
    {
        private readonly MedicoAPIContext _context;

        public PrescriptionsController(MedicoAPIContext context)
        {
            _context = context;
        }


        // Make a new prescription
        [HttpPost("Prescribe")]
        public async Task<ActionResult> PostPrescription(NewPrescription nPrescription)
        {
            if (ModelState.IsValid)
            {
                var prescription = new Prescription
                {
                    DoctorId = nPrescription.DoctorId,
                    PatientId = nPrescription.PatientId,
                    PrescriptionContent = nPrescription.PrescriptionContent,
                    RepeatNum = nPrescription.RepeatNum,
                    DaysApart = nPrescription.DaysApart,
                    IssueDate = nPrescription.IssueDate,
                    PrescriptionId = Guid.NewGuid().ToString(),
                };
                _context.Prescription.Add(prescription);
                await _context.SaveChangesAsync();

                return Ok();
            }
            return BadRequest(ModelState);
        }

        // ENTIRE PRESCRIPTION DETAILS
        *//*private async Task<FullDetailPrescription> GetPrescriptionDetails(string prescriptionID)
        {
            Prescription prescription = null;

            if (!string.IsNullOrWhiteSpace(prescriptionID))
            {
                prescription = await _context.Prescription
                    .AsNoTracking()
                    .Include(pres => pres.Doctor)
                    .Include(pres => pres.Patient)
                    .FirstOrDefaultAsync(pres => pres.PrescriptionId == prescriptionID);
            }
                prescription = await _context.Prescription
                    .AsNoTracking()
                    .Include(pres => pres.Doctor)
                    .Include(pres => pres.Patient)
                    .FirstOrDefaultAsync(pres => pres.PrescriptionId == prescriptionID);


            if (prescription == null)
            {

                return null;
            }

            var selectedPrescription = new FullDetailPrescription
            {
                DoctorName = prescription.Doctor.DoctorName,
                DoctorCPSONum = prescription.Doctor.DoctorCPSONum,
                DoctorPhone = prescription.Doctor.DoctorPhone,
                PrescriptionContent = prescription.PrescriptionContent,
                PatientName = $"{prescription.Patient.FirstName} {prescription.Patient.LastName}",
                IssueDate = prescription.IssueDate,
                RepeatNum = prescription.RepeatNum,
                DaysApart = prescription.DaysApart,
                PrescriptionID = prescription.PrescriptionId,
            };

            return selectedPrescription;
        }
*//*

        // DELETE: api/Prescriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrescription(int id)
        {
            var prescription = await _context.Prescription.FindAsync(id);
            if (prescription == null)
            {
                return NotFound();
            }

            _context.Prescription.Remove(prescription);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool PrescriptionExists(string prescriptionID)
        {
            return _context.Prescription.Any(e => e.PrescriptionId == prescriptionID);
        }





       *//* // GET: api/Prescriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FullDetailPrescription>> GetPrescription(string prescriptionID)
        {
            if (PrescriptionExists(prescriptionID))
            {

                var selectedPrescription = await GetPrescriptionDetails(prescriptionID);
                return Ok(selectedPrescription);

            }
            ModelState.AddModelError ("Error", "PrescriptionMayNotExists");
            return BadRequest(ModelState);
        }*//*



        [HttpGet("ValidatePrescription")]
        public async Task<ActionResult<FullDetailPrescription>> ConfirmPrescription(string prescriptionID)
        {
            if (!string.IsNullOrWhiteSpace(prescriptionID) && PrescriptionExists(prescriptionID))
            {

                var selectedPrescription = await GetPrescriptionDetails(prescriptionID);
                return Ok(selectedPrescription);

            }
            ModelState.AddModelError("Error", "PrescriptionMayNotExists");
            return BadRequest(ModelState);
        }
    }
}
*/