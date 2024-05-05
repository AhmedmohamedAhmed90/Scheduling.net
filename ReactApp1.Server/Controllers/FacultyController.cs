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

        [HttpGet("{universityId}/{facultyName}", Name = "GetFacultyByNameInUniversity")]
      public async Task<ActionResult<Faculty>> GetFacultyByNameInUniversity(int universityId, string facultyName)
      {
          var faculty = await _dbContext.Faculties
          .Include(f => f.University)
          .FirstOrDefaultAsync(f => f.UniversityId == universityId && f.Name == facultyName);

         if (faculty == null)
        {
          return NotFound("Faculty not found in the specified university");
        }

         return Ok(new
    {
        facultyId = faculty.Id,
        facultyName = faculty.Name,
        uniId = faculty.UniversityId,
        universitydata = faculty.University,
    });
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


[HttpPost("{universityId}",Name = "CreateFaculty")]
public async Task<IActionResult> CreateFaculty(int universityId, [FromBody]Faculty faculty)
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
    var faculty = await _dbContext.Faculties.FindAsync(id);
    if (faculty == null)
    {
        return BadRequest("Faculty not found");
    }

    if (faculty.UniversityId != universityId)
    {
        return BadRequest("Faculty does not belong to the specified university");
    }

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
