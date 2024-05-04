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
    [Route("api/[controller]")]
    public class InstructorController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public InstructorController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetInstructors")]
        public async Task<ActionResult<IEnumerable<Instructor>>> GetInstructors()
        {
            var instructors = await _dbContext.Instructors.ToListAsync();
            return Ok(instructors);
        }

        [HttpGet("{id}", Name = "GetInstructor")]
        public async Task<ActionResult<Instructor>> GetInstructor(int id)
        {
            var instructor = await _dbContext.Instructors.FindAsync(id);
            if (instructor == null)
            {
                return NotFound("Instructor not found");
            }
            return Ok(instructor);
        }

        [HttpPut("{id}", Name = "UpdateInstructor")]
        public async Task<IActionResult> UpdateInstructor(int id, Instructor instructor)
        {
            if (id != instructor.Id)
            {
                return BadRequest("Invalid instructor ID");
            }

            _dbContext.Entry(instructor).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(instructor);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructorExists(id))
                {
                    return BadRequest("Instructor not found");
                }
                else
                {
                    throw;
                }
            }
        }

        [HttpPost(Name = "CreateInstructor")]
        public async Task<IActionResult> CreateInstructor(int facultyId, Instructor instructor)
        {
            var faculty = await _dbContext.Faculties.FindAsync(facultyId);
            if (faculty == null)
            {
                return BadRequest("Faculty not found");
            }

            instructor.FacultyId = facultyId;
            _dbContext.Instructors.Add(instructor);
            await _dbContext.SaveChangesAsync();

            return Ok(instructor);
        }

        [HttpDelete("{id}", Name = "DeleteInstructor")]
        public async Task<IActionResult> DeleteInstructor(int id)
        {
            var instructor = await _dbContext.Instructors.FindAsync(id);
            if (instructor == null)
            {
                return BadRequest("Instructor not found");
            }

            _dbContext.Instructors.Remove(instructor);
            await _dbContext.SaveChangesAsync();

            return Ok("Instructor deleted");
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private bool InstructorExists(int id)
        {
            return _dbContext.Instructors.Any(e => e.Id == id);
        }
    }
}