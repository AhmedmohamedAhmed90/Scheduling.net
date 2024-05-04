namespace ReactApp1.Server.Models
{
    public class Exception
    {
    public int ExceptionId { get; set; }
    public int StudentId { get; set; }
    public string Reason { get; set; }=string.Empty;
    public string Description { get; set; }=string.Empty;
    public string Status { get; set; } = "pending"; // Default status is pending
    public string Priority { get; set; } = "normal"; // Default priority
    public Student? Student { get; set; }
    }
}