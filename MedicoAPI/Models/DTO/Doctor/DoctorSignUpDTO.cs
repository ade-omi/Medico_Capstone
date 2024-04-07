using System.ComponentModel.DataAnnotations;

namespace MedicoAPI.Models.DTO.Doctor
{
    public class DoctorSignUpDTO: DoctorDTO
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(16, MinimumLength = 5, ErrorMessage = "Username must be between 5 to 16 characters long.")]
        [RegularExpression(@"^\w+$", ErrorMessage = "Username must not contain special characters.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "Password must have a minimum of 8 characters.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [StringLength(7, MinimumLength = 5, ErrorMessage = "Doctor must have a CPSO")]
        public string DoctorCPSONum { get; set; }
    }
}
