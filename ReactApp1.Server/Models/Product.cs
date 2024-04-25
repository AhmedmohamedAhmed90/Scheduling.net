using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ReactApp1.Server.Models
{
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(50)]
        [Required]
        public required string Name { get; set; }
        [StringLength(200)]
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public bool IsInStore { get; set; }
    }
}