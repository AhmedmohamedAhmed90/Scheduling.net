using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ReactApp1.Server.Models
{
    public class Student : IdentityUser
    {
      

      [Key]
        public override string Id { get; set; }

        // Other additional properties specific to Student entity
        [StringLength(50)] 
        public string Name { get; set; }

        public string Address { get; set; }

        public string Age { get; set; }

        public string Year { get; set; }

        public string Faculty { get; set; }
    }
}
