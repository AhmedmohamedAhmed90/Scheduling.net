namespace ReactApp1.Server.Models
{
    public class FacultyCourse
    {
        public int FacultyId { get; set; }
        public Faculty Faculty { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}