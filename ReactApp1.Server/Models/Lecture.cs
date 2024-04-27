namespace ReactApp1.Server.Models
{
    public class Lecture
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string StartTime { get; set; }
        public required string EndTime { get; set; }
        public required string Day { get; set; }
        public required string Room { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; } = null!;


    }
}