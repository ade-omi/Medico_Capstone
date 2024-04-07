using System.ComponentModel.DataAnnotations;

namespace MedicoAPI.Models.DTO.Appointment
{
    public class AppointmentDTO
    {
        public int AppointmentId { get; set; }


        [Required(ErrorMessage = "Appointment reasion is required.")]
        public string Reason { get; set; }
        [Required(ErrorMessage = "Appointment Date is required.")]
        public DateOnly AppmntDate { get; set; }
        [Required(ErrorMessage = "Appointment Time is required.")]
        public TimeOnly AppmntTime { get; set; }
    }
}
