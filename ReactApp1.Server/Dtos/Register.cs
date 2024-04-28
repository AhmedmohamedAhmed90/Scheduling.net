using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApp1.Server.Dtos
{
    public class Register
    { 
        [Required]
        public String? Username {get; set;}
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public String? Password { get; set; }
    }
}