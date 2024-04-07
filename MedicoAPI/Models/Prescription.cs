namespace MedicoAPI.Models
{
    public class Prescription
    {
        public int PrescriptionId { get; set; }
        public string PrescriptionUID { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public string PrescriptionContent { get; set; }
        public int RepeatNum { get; set; }
        public int DaysApart {  get; set; }
        public DateOnly IssueDate { get; set; }
        public Doctor Doctor { get; set; }
        public Patient Patient { get; set; }
    }
}
