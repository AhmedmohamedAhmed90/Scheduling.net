namespace ReactApp1.Server.Models
{
    public class Course
    {
        public int Id { get; set; }
        public required string Code { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public string? Departmeant { get; set; }
        public ICollection<Group>? Groups { get; } = [];
        public ICollection<FacultyCourse>? FacultyCourses { get; set; }

    }
}