using System.ComponentModel.DataAnnotations;

namespace MedicoAPI.Models.DTO.Doctor
{
    public class DoctorDTO
    {
        public int DoctorId { get; set; }

        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(50, MinimumLength = 4, ErrorMessage = "Last name must be up to 100 characters long.")]
        public string DoctorName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "The Phone number field is not a valid phone number.")]
        public string DoctorPhone { get; set; }

        
    }
}
