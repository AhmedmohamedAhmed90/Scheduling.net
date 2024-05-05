using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Dtos;
using ReactApp1.Server.Models;
using System.Collections.Generic;
using System.Drawing.Printing;
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
        public async Task<IActionResult> GetExeptions()
        {
            return Ok(await _context.Exceptions.AsNoTracking().ToListAsync());
        }
        [HttpPost]
        public async Task<IActionResult> SubmitException([FromBody] EXPDto req)
        {
            Console.WriteLine(req.studentId);
            Console.WriteLine(req);
            var student = await _context.Students.FindAsync(req.studentId);
            Console.WriteLine(student);

            if (student == null)
            {
                return BadRequest("Group not found");
            }
            var Exceptions = new Models.Exception
            {
                StudentId = req.studentId,
                Reason = req.reason,
                Description = req.description,
                Status = "pending"
            };

            _context.Exceptions.Add(Exceptions);
            await _context.SaveChangesAsync();

            return Ok(
                new Models.Exception
                {
                    StudentId = req.studentId,
                    Reason = req.reason,
                    Description = req.description
                }

            );
        }

    }
}