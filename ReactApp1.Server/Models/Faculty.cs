namespace ReactApp1.Server.Models
{
    public class Faculty
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int UniversityId { get; set; }
        public University? University { get; set; } = null!;
        public ICollection<Instructor>? Instructors { get; } = [];
    }
}
// public string? Dean { get; set; }