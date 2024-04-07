using MedicoAPI.Models.DTO.Appointment;
using MedicoAPI.Models.DTO.Patient;

namespace MedicoAPI.Models.DTO.Doctor
{
    public class DoctorDashboardDTO
    {
        public List<AppointmentDoctorDashboardDTO> Appointments { get; set; } = new();
        public List<PatientDTO> Patients { get; set; } = new();
    }

    public class AppointmentDoctorDashboardDTO : AppointmentDTO
    {
        public string PatientFullName { get; set; }
    }


}
