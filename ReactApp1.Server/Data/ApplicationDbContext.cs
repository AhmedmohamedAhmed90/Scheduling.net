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

     // public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
     //    {
     //    }
    public DbSet<Product> Products { get; set; }
    public DbSet<Models.Exception> Exceptions { get; set; }
    public DbSet<Student> Students { get; set; }
    public virtual DbSet<University> Universities { get; set; }
    public DbSet<Faculty> Faculties { get; set; }
    public DbSet<Instructor> Instructors { get; set; }
    
    public virtual DbSet<Course> Courses { get; set; }
  
    public DbSet<GroupInstructor> GroupInstructors { get; set; }
    
    public DbSet<Group> Groups { get; set; }
    public DbSet<Lecture> Lectures { get; set; }
     public DbSet<FacultyCourse> FacultyCourses { get; set; }
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
      //  Builder.Entity<GroupInstructor>().HasKey(e => e.Id);
      Builder.Entity<Group>().HasKey(e => e.Id);
      
       Builder.Entity<Group>()
        .HasIndex(g => g.Code)  
        .IsUnique();            
      
       Builder.Entity<GroupInstructor>()
        .HasKey(gi => new { gi.GroupsId, gi.InstructorsId });

        Builder.Entity<FacultyCourse>()
        .HasKey(gi => new { gi.FacultyId, gi.CourseId });

   Builder.Entity<GroupInstructor>()
    .HasOne(gi => gi.Group)
    .WithMany() 
    .HasForeignKey(gi => gi.GroupsId) 
    .OnDelete(DeleteBehavior.Cascade);

    Builder.Entity<Course>()
        .HasMany(c => c.Groups)
        .WithOne(g => g.Course)
        .OnDelete(DeleteBehavior.Cascade);

   
    }
   }
   
}