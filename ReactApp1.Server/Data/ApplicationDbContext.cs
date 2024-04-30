using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using reactapp1.Server.Models;

namespace ReactApp1.Server.Data
{

     public class ApplicationDbContext : IdentityDbContext<Student>
    {
       public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
       
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<University> Universities { get; set; }
    public DbSet<Faculty> Faculties { get; set; }
    public DbSet<Instructor> Instructors { get; set; }
    
    public DbSet<Course> Courses { get; set; }
    
    public DbSet<CourseInstructor> CourseInstructors { get; set; }
    protected override void OnModelCreating(ModelBuilder Builder)
    {
      base.OnModelCreating(Builder);
      List<IdentityRole> roles = new List<IdentityRole>
      {
           new IdentityRole
           {
            Name="Admin",
            NormalizedName="ADMIN",
           },
           new IdentityRole
           {
            Name="User",
            NormalizedName="USER",
           }
      };
      Builder.Entity<IdentityRole>().HasData(roles);
      
    }
   }
   
}