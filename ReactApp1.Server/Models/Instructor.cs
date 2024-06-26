namespace ReactApp1.Server.Models
{
    public class Instructor
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int FacultyId { get; set; }
        public Faculty? Faculty { get; set; } = null!;
        public ICollection<Group>? Groups { get; } = [];
    }
}