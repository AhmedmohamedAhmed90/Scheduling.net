namespace ReactApp1.Server.Models
{
    public class Group
    {


        public int Id { get; set; }
        public required string Code { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; } = null!;
        public ICollection<Lecture> Lectures { get; } = [];
    }
}