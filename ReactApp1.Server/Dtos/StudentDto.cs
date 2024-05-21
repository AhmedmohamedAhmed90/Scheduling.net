using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Dtos
{
    public class StudentDto
    {
        [StringLength(50)]
        public string? Name { get; set; }

        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [StringLength(100)]
        public string? Address { get; set; }

        [Range(0, 150)]
        public int Age { get; set; }

        [StringLength(50)]
        public string? Year { get; set; }

        [StringLength(50)]
        public string? Faculty { get; set; }

        public string? PhoneNumber { get; set; }

        public int UniversityId { get; set; }
    }
}
