namespace MedicoAPI.Models.DTO.Prescription
{
    public class FullDetailPrescription
    {
        public string PrescriptionUID { get; set; }
        public string PrescriptionContent { get; set; }
        public int RepeatNum { get; set; }
        public int DaysApart { get; set; }
        public DateOnly IssueDate { get; set; }
        public string DoctorPhone { get; set; }
        public string DoctorCPSONum { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }

    }
}
