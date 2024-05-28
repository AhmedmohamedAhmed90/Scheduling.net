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
    public class UniversityController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public UniversityController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetUniversities")]
        public async Task<ActionResult<IEnumerable<University>>> GetUniversities()
        {
            var universities = await _dbContext.Universities.ToListAsync();
            return Ok(universities);
        }

        //         [HttpGet("{name}", Name = "GetUniversity")]
        // public async Task<ActionResult<University>> GetUniversity(string name)
        // {
        //     var university = await _dbContext.Universities
        //         .Include(u => u.Faculties) 
        //         .FirstOrDefaultAsync(u => u.Name == name);

        //     if (university == null)
        //     {
        //         return NotFound("University not found");
        //     }


        //     var universityData = new
        //     {
        //         uniId = university.Id,
        //         University = university
        //     };

        //     return Ok(universityData);
        // }

        [HttpGet("{id}", Name = "GetUniversity")]
        public async Task<ActionResult<University>> GetUniversity(int id)
        {
            var university = await _dbContext.Universities.FindAsync(id);


            return Ok(university);
        }


        [HttpPut("{id}", Name = "UpdateUniversity")]
        public async Task<IActionResult> UpdateUniversity(int id, University university)
        {
            if (id != university.Id)
            {
                return BadRequest("Invalid university ID");
            }

            _dbContext.Entry(university).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(university);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UniversityExists(id))
                {
                    return BadRequest("University not found");
                }
                else
                {
                    throw;
                }
            }
        }

        [HttpPost(Name = "CreateUniversity")]
        public async Task<ActionResult<University>> CreateUniversity(University university)
        {
            _dbContext.Universities.Add(university);
            await _dbContext.SaveChangesAsync();
            return Ok(university);
        }

        [HttpDelete("{id}", Name = "DeleteUniversity")]
        public async Task<IActionResult> DeleteUniversity(int id)
        {
            var university = await _dbContext.Universities.FindAsync(id);
            if (university == null)
            {
                return BadRequest("University not found");
            }

            _dbContext.Universities.Remove(university);
            await _dbContext.SaveChangesAsync();

            return Ok("University deleted");
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private bool UniversityExists(int id)
        {
            return _dbContext.Universities.Any(e => e.Id == id);
        }
    }
}
