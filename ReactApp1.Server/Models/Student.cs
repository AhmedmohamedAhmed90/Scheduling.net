using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ReactApp1.Server.Models
{
    public class Student : IdentityUser
    {
        [StringLength(50)]
        public string? Name { get; set; }

        [StringLength(100)]
        public string? Address { get; set; }

        [Range(0, 150)]
        public int Age { get; set; }

        [StringLength(50)]
        public string? Year { get; set; }

        public string? Faculty { get; set; }

        public ICollection<Exception> Exceptions { get; } = new List<Exception>();

        [StringLength(15)]
        public override string? PhoneNumber { get; set; }

        public int UniversityId { get; set; }
        public University University { get; set; }
    }
}
