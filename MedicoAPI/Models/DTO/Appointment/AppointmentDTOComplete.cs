using System.ComponentModel.DataAnnotations;

namespace MedicoAPI.Models.DTO.Appointment
{
    public class AppointmentDTOComplete: AppointmentDTO
    {
        [Required(ErrorMessage = "Patient ID is Required")]
        [Range(1, double.MaxValue, ErrorMessage = "Please Enter a valid patient id")]
        public int PatientID { get; set; }

        [Required(ErrorMessage = "DoctorID ID is Required")]
        [Range(1, double.MaxValue, ErrorMessage = "Please Enter a valid doctor id")]
        public int DoctorID { get; set; }
    }
}
