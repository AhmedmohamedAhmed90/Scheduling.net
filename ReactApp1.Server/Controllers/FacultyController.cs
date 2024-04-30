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

        [HttpGet("{id}", Name = "GetFaculty")]
        public async Task<ActionResult<Faculty>> GetFaculty(int id)
        {
            var faculty = await _dbContext.Faculties.FindAsync(id);
            if (faculty == null)
            {
                return NotFound("Faculty not found");
            }
            return Ok(faculty);
        }

        [HttpPut("{id}", Name = "UpdateFaculty")]
        public async Task<IActionResult> UpdateFaculty(int id, Faculty faculty)
        {
            if (id != faculty.Id)
            {
                return BadRequest("Invalid faculty ID");
            }

            _dbContext.Entry(faculty).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(faculty);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacultyExists(id))
                {
                    return BadRequest("Faculty not found");
                }
                else
                {
                    throw;
                }
            }
        }
[HttpPost(Name = "CreateFaculty")]
public async Task<IActionResult> CreateFaculty(int universityId, Faculty faculty)
{
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


        [HttpDelete("{id}", Name = "DeleteFaculty")]
        public async Task<IActionResult> DeleteFaculty(int id)
        {
            var faculty = await _dbContext.Faculties.FindAsync(id);
            if (faculty == null)
            {
                return BadRequest("Faculty not found");
            }

            _dbContext.Faculties.Remove(faculty);
            await _dbContext.SaveChangesAsync();

            return Ok("Faculty deleted");
        }

        // [HttpPost("AddToUniversity/{universityId}", Name = "AddToUniversity")]
        // public async Task<IActionResult> AddToUniversity(int universityId, IEnumerable<Faculty> faculties)
        // {
        //     var university = await _dbContext.Universities.FindAsync(universityId);
        //     if (university == null)
        //     {
        //         return NotFound("University not found");
        //     }

        //     foreach (var faculty in faculties)
        //     {
        //         faculty.UniversityId = universityId;
        //         _dbContext.Faculties.Add(faculty);
        //     }

        //     await _dbContext.SaveChangesAsync();

        //     return Ok("Faculties added to the university successfully");
        // }

        [ApiExplorerSettings(IgnoreApi = true)]
        private bool FacultyExists(int id)
        {
            return _dbContext.Faculties.Any(e => e.Id == id);
        }
    }
}
