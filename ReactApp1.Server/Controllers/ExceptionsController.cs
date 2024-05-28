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
            var exceptions = await _context.Exceptions
                .Include(e => e.Student) // Eager loading the Student navigation property
                .ToListAsync();

            return Ok(exceptions);
        }
        [HttpGet("ByUniversity/{universityId}")]
        public async Task<IActionResult> GetExceptionsByUniversityId(int universityId)
        {
            var exceptions = await _context.Exceptions
                .Include(e => e.Student)
                .Where(e => e.Student.UniversityId == universityId)
                .ToListAsync();


            return Ok(exceptions);
        }

        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetExceptionsByStudentId(string studentId)
        {
            var exceptions = await _context.Exceptions
                .Where(e => e.StudentId == studentId)
                .ToListAsync();

            if (exceptions == null || exceptions.Count == 0)
            {
                return NotFound("No exceptions found for the given student ID");
            }

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