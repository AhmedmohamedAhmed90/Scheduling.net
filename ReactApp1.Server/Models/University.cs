namespace ReactApp1.Server.Models
{
    public class University
    {

        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string PhoneNumber { get; set; }
        public ICollection<Faculty>? Faculties { get; } = [];
    }
}