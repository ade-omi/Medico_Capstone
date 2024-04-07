using System.ComponentModel.DataAnnotations;

namespace MedicoAPI.Models.DTO.Patient
{
    public class PatientSignUpDTO : PatientDTO
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(16, MinimumLength = 5, ErrorMessage = "Username must be between 5 to 16 characters long.")]
        [RegularExpression(@"^\w+$", ErrorMessage = "Username must not contain special characters.")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "Password must have a minimum of 8 characters.")]
        public string Password { get; set; }
    }
}
