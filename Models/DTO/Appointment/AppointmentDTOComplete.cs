using System.ComponentModel.DataAnnotations;

namespace MedicoAPI.Models.DTO.Appointment
{
    public class AppointmentDTOComplete: AppointmentDTO
    {
        [Required(ErrorMessage = "Patient ID is Required")]
        public string PatientID { get; set; }

        [Required(ErrorMessage = "DoctorID ID is Required")]

        public string DoctorID { get; set; }
    }
}

/*
            [Range(1, double.MaxValue, ErrorMessage = "Please Enter a valid doctor id")]
 */