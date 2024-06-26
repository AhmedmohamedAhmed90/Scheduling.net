using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApp1.Server.Dtos
{
    public class Register
    {
        [StringLength(50)]
        public string? Name { get; set; }
        // [Required]
        public String? Username { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        // [Required]
        public String? Password { get; set; }
        [StringLength(100)]
        public string? Address { get; set; }

        [Range(0, 150)] // Example range for age
        public int Age { get; set; }

        [StringLength(50)]
        public string? Year { get; set; }

        [StringLength(50)]
        public string? Faculty { get; set; }

        public string? PhoneNumber { get; set; }

        [Range(0, 150)]
        public int UniversityId { get; set; }

        [StringLength(50)]
        public string? UniversityName { get; set; }
        [StringLength(100)]
        public string? UniversityAddress { get; set; }
        [StringLength(50)]
        public string? UniversityPhoneNumber { get; set; }
    }
}