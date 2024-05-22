using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacultyController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public FacultyController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetFaculties")]
        public async Task<ActionResult<IEnumerable<Faculty>>> GetFaculties()
        {
            var faculties = await _dbContext.Faculties.ToListAsync();
            return Ok(faculties);
        }

        [HttpGet("ByUniversity/{universityId}", Name = "GetFacultiesByUniversityId")]
        public async Task<IActionResult> GetFacultiesByUniversityId(int universityId)
        {
            var university = await _dbContext.Universities
                .Include(u => u.Faculties)
                .FirstOrDefaultAsync(u => u.Id == universityId);

            if (university == null || university.Faculties == null)
            {
                return NotFound("University not found");
            }

            var faculties = university.Faculties.Select(f => new
            {
                id = f.Id,
                name = f.Name,
            }).ToList();

            var json = JsonSerializer.Serialize(faculties, new JsonSerializerOptions
            {
                WriteIndented = true, // You can set this to false in production for a more compact JSON
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            return Content(json, "application/json");
        }
        [HttpGet("{id}", Name = "GetFacultyById")]
        public async Task<IActionResult> GetFacultyById(int id)
        {
            var faculty = await _dbContext.Faculties.FindAsync(id);

            if (faculty == null)
            {
                return NotFound("Faculty not found");
            }

            return Ok(faculty);
        }

        [HttpPut("{universityId}/{id}", Name = "UpdateFaculty")]
        public async Task<IActionResult> UpdateFaculty(int universityId, int id, Faculty faculty)
        {
            if (id != faculty.Id)
            {
                return BadRequest("Invalid faculty ID");
            }

            if (universityId != faculty.UniversityId)
            {
                return BadRequest("Invalid university ID");
            }

            var existingFaculty = await _dbContext.Faculties
                .Include(f => f.FacultyCourses)
                .FirstOrDefaultAsync(f => f.Id == id && f.UniversityId == universityId);

            if (existingFaculty == null)
            {
                return NotFound("Faculty not found");
            }

            existingFaculty.Name = faculty.Name;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(existingFaculty);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacultyExists(id))
                {
                    return NotFound("Faculty not found");
                }
                else
                {
                    throw;
                }
            }
        }



        [HttpPost("{universityId}", Name = "CreateFaculty")]
        public async Task<IActionResult> CreateFaculty(int universityId, [FromBody] Faculty faculty)
        {
            Console.WriteLine("University ID received: " + universityId);
            var university = await _dbContext.Universities.FindAsync(universityId);
            if (university == null)
            {
                return BadRequest("University not found");
            }

            faculty.UniversityId = universityId;
            _dbContext.Faculties.Add(faculty);
            await _dbContext.SaveChangesAsync();

            return Ok(faculty);
        }


        [HttpDelete("{universityId}/{id}", Name = "DeleteFaculty")]
        public async Task<IActionResult> DeleteFaculty(int universityId, int id)
        {
            var faculty = await _dbContext.Faculties
                .Include(f => f.FacultyCourses)
                .FirstOrDefaultAsync(f => f.Id == id && f.UniversityId == universityId);

            if (faculty == null)
            {
                return BadRequest("Faculty not found");
            }


            _dbContext.FacultyCourses.RemoveRange(faculty.FacultyCourses);


            _dbContext.Faculties.Remove(faculty);

            await _dbContext.SaveChangesAsync();

            return Ok("Faculty deleted");
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private bool FacultyExists(int id)
        {
            return _dbContext.Faculties.Any(e => e.Id == id);
        }
    }
}
