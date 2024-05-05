using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApp1.Server.Controllers
{
[ApiController]
[Route("api/Exceptions")]
public class ExceptionsController : Controller
    {
    private readonly ApplicationDbContext _context;

    public ExceptionsController(ApplicationDbContext context)
    {
        _context = context;
    }
        [HttpGet]
        public async Task<IActionResult> GetExeptions(){
            return Ok(await _context.Exceptions.AsNoTracking().ToListAsync());
        }
[HttpPost]
    public async Task<IActionResult> SubmitException( string studentId , string reason ,string description)
    {
         var student = await _context.Students.FindAsync(studentId);

         if(student == null){
             return BadRequest("Group not found");
         }
          var Exceptions = new Models.Exception
            {
                StudentId = studentId,
                Reason = reason , 
                Description = description,
                Status="pending"
            };

        _context.Exceptions.Add(Exceptions);
        await _context.SaveChangesAsync();

        return Ok (
            new Models.Exception
            {
                StudentId = studentId,
                Reason = reason , 
                Description = description,
            }

        );
    }

    }
}