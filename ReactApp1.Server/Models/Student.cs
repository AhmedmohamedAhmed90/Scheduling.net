using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ReactApp1.Server.Models
{
    public class Student : IdentityUser
    {
        
         [StringLength(50)] 
        public string Name { get; set; }

        [StringLength(100)] 
        public string Address { get; set; }

        [Range(0, 150)] // Example range for age
        public int Age { get; set; }

        [StringLength(50)] 
        public string Year { get; set; }

        [StringLength(50)] 
        public string Faculty { get; set; }

        public ICollection<Exception> Exception { get; } = [];
     
    }

    
}
