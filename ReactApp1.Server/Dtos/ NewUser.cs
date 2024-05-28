using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApp1.Server.Dtos
{
    public class NewUser
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string FacultyID { get; set; }

        public bool isAdmin { get; set; }

        public int UniversityID { get; set; }
        public string Id { get; set; }
        public string Token { get; set; }
    }
}