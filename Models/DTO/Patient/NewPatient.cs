using System.ComponentModel.DataAnnotations;

namespace MedicoAPI.Models.DTO.Patient
{
    public class NewPatient
    {
        [Required(ErrorMessage = "Gender selection is required.")]
        public char gender {  get; set; }

        [Required(ErrorMessage = "Date of birth is required.")]
        public DateOnly DateOfBirth { get; set; }

        [Required(ErrorMessage = "Health Card Number is required.")]
        //[RegularExpression(@"^[A-Za-z0-9]{10,12}$", ErrorMessage = "Health Card Number must be between 10 to 12 alphanumeric characters.")]
        public string HealthCardNumber { get; set; }
    }
}
