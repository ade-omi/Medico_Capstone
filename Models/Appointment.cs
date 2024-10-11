namespace MedicoAPI.Models
{
    public class Appointment
    {
        public string AppointmentId { get; set; }
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public string Reason { get; set; }
        public DateOnly AppmntDate { get; set; }
        public TimeOnly AppmntTime { get; set; }
        // Navigation properties
        public Patient Patient { get; set; }
        public Doctor Doctor { get; set; }
    }

}
