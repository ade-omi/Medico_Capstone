using MedicoAPI.Models.DTO.Appointment;
using MedicoAPI.Models.DTO.Prescription;

namespace MedicoAPI.Models.DTO.Patient
{
    public class PatientDashboardDTO
    {

        public List<PatientDashBoardAppointmentDTO> Appointments { get; set; } = new();
        public List<PatientDashboardPrescription> Prescriptions { get; set; } = new();

    }

    public class PatientDashBoardAppointmentDTO : AppointmentDTO
    {
        public string DoctorFullName { get; set; }
    }
}
