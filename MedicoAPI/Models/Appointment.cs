namespace MedicoAPI.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public string Reason { get; set; }
        public DateOnly AppmntDate { get; set; }
        public TimeOnly AppmntTime { get; set; }
        // Navigation properties
        public Patient Patient { get; set; }
        public Doctor Doctor { get; set; }
    }

}
