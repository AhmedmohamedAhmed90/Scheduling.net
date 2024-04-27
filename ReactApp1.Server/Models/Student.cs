using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Models
{
    public class Student : IdentityUser
    {
     [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; } // Unique and auto-incrementing ID

    // [Required]
    [StringLength(50)] 

    // [MaxLength(5)]
    public string Name { get; set; }
    public string Address { get; set; }

    public string Age { get; set; }

    public string Year { get; set; }
    public string Faculty { get; set; }

    public string? Email { get; set; }
    public string? Username { get; set; }

    public string? Password { get; set; }
    }
}