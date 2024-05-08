using ReactApp1.Server.Models;

namespace reactapp1.Server.Models
{
    public class GroupInstructor
    {
        public int Id { get; set; }
        public int GroupsId { get; set; }
        public Group? Group { get; set; } = null!;
        public int InstructorsId { get; set; }
        public Instructor Instructor { get; set; } = null!;

    }
}