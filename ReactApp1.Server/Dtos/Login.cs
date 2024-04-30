using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Dtos
{
    public class Login
    {
        [Required]
        public String? Username {get; set;}
        [Required]
        public String? Password { get; set; }
    }
}