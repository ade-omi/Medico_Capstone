using System.ComponentModel.DataAnnotations;

namespace MedicoAPI.Models.DTO.Patient
{
    // A PATIENT DTO THAT REMOVES THE NAVIGATIONAL PROPERTIES
    public class PatientDTO
    {
        public int PatientId { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "First name must be up to 100 characters long.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Last name must be up to 100 characters long.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "The Phone number field is not a valid phone number.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Date of birth is required.")]
        public DateOnly DateOfBirth { get; set; }

        [Required(ErrorMessage = "Health Card Number is required.")]
        //[RegularExpression(@"^[A-Za-z0-9]{10,12}$", ErrorMessage = "Health Card Number must be between 10 to 12 alphanumeric characters.")]
        public string HealthCardNumber { get; set; }
    }
}
