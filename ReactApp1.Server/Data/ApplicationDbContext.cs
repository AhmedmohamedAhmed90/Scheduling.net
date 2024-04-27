using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ReactApp1.Server.Data
{

     public class ApplicationDbContext : IdentityDbContext<Student>
    {
       public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
       
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<Student> Students { get; set; }
    }
   
}