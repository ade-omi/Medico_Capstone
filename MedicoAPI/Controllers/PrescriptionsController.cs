using System;
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

namespace MedicoAPI.Controllers
{
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
                    PrescriptionUID = Guid.NewGuid().ToString(),
                };
                _context.Prescription.Add(prescription);
                await _context.SaveChangesAsync();

                return Ok();
            }
            return BadRequest(ModelState);
        }


        // GET: api/Prescriptions/5
        [HttpGet("View/{id}")]
        public async Task<ActionResult<FullDetailPrescription>> GetPrescription(int id)
        {
            if ( id > 0 && PrescriptionExists(id, ""))
            {

                var selectedPrescription = await GetPrescriptionDetails(prescriptionID: id);
                return Ok(selectedPrescription);

            }
            ModelState.AddModelError("Error", "PrescriptionMayNotExists");
            return BadRequest(ModelState);
        }


        [HttpGet("ValidatePrescription")]
        public async Task<ActionResult<FullDetailPrescription>> ConfirmPrescription(string prescriptionUID)
        {
            if (!string.IsNullOrWhiteSpace(prescriptionUID) && PrescriptionExists(0, prescriptionUID))
            {

                var selectedPrescription = await GetPrescriptionDetails(prescriptionUID: prescriptionUID);
                return Ok(selectedPrescription);

            }
            ModelState.AddModelError("Error", "PrescriptionMayNotExists");
            return BadRequest(ModelState);
        }


        private async Task<Object> GetPrescriptionDetails(string prescriptionUID = "", int prescriptionID = 0)
        {
            Prescription prescription = null; 

            if (!string.IsNullOrWhiteSpace(prescriptionUID))
            {
                prescription = await _context.Prescription
                    .AsNoTracking()
                    .Include(pres => pres.Doctor)
                    .Include(pres => pres.Patient)
                    .FirstOrDefaultAsync(pres => pres.PrescriptionUID == prescriptionUID);
            }
            else if (prescriptionID > 0)
            {
                prescription = await _context.Prescription
                    .AsNoTracking()
                    .Include(pres => pres.Doctor)
                    .Include(pres => pres.Patient)
                    .FirstOrDefaultAsync(pres => pres.PrescriptionId == prescriptionID);
            }

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
                PrescriptionUID = prescription.PrescriptionUID,
            };

            return selectedPrescription;
        }
 

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

        private bool PrescriptionExists(int id, string prescriptionUID)
        {
            return _context.Prescription.Any(e => e.PrescriptionId == id || e.PrescriptionUID == prescriptionUID);
        }

        //ENDPOINTS THAT ARE NOT NEEDED RIGHT NOW

        /*
            // GET: api/Prescriptions
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescription()
            {
                return await _context.Prescription.ToListAsync();
            }


            [HttpPut("Edit/{id}")]
        public async Task<IActionResult> PutPrescription(int id, PrescriptionDTO newPrescription)
        {
            if(ModelState.IsValid)
            { 
                if (id != newPrescription.PrescriptionId)
                {
                    return BadRequest();
                }

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PrescriptionExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return NoContent();
        }
         */


    }
}
