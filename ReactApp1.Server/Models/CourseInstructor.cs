using ReactApp1.Server.Models;

namespace reactapp1.Server.Models
{
    public class CourseInstructor
    {
        public int Id { get; set; }
        public int CoursesId { get; set; }
        public int InstructorsId { get; set; }
        public Instructor Instructor { get; set; } = null!;
        public Course Course { get; set; } = null!;

    }
}