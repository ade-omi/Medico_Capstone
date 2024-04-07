namespace MedicoAPI.Models.DTO.Prescription
{
    public class PatientDashboardPrescription
    {
        public int PrescriptionId { get; set; }
        public string PrescriptionContent { get; set; }
        public DateOnly IssueDate { get; set; }
        public string DoctorName { get; set; }
    }
}
