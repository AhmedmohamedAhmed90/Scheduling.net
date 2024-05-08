using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Dtos;
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
public async Task<IActionResult> GetExceptions()
{
    var exceptions = await _context.Exceptions.ToListAsync();

    return Ok(exceptions);
}

        [HttpPost]
        public async Task<IActionResult> SubmitException([FromBody] EXPDto req)
        {
            var student = await _context.Students.FindAsync(req.studentId);

            if (student == null)
            {
                return BadRequest("Student not found");
            }

            var exception = new Models.Exception
            {
                StudentId = req.studentId,
                Reason = req.reason,
                Description = req.description,
                Status = "pending"
            };

            _context.Exceptions.Add(exception);
            await _context.SaveChangesAsync();

            return Ok(exception);
        }

        [HttpPost("{id}/approve")]
        public async Task<IActionResult> ApproveException(int id)
        {
            var exception = await _context.Exceptions.FindAsync(id);

            if (exception == null)
            {
                return NotFound();
            }

            exception.Status = "approved";
            await _context.SaveChangesAsync();

            return Ok(exception);
        }

        [HttpPost("{id}/reject")]
        public async Task<IActionResult> RejectException(int id)
        {
            var exception = await _context.Exceptions.FindAsync(id);

            if (exception == null)
            {
                return NotFound();
            }

            exception.Status = "rejected";
            await _context.SaveChangesAsync();

            return Ok(exception);
        }
    }
}