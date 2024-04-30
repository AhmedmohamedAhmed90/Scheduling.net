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
    public class GroupController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public GroupController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet(Name = "GetGroups")]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
            var groups = await _dbContext.Groups.ToListAsync();
            return Ok(groups);
        }

        [HttpGet("{id}", Name = "GetGroup")]
        public async Task<ActionResult<Group>> GetGroup(int id)
        {
            var group = await _dbContext.Groups.FindAsync(id);
            if (group == null)
            {
                return NotFound("Group not found");
            }
            return Ok(group);
        }

        [HttpPost(Name = "CreateGroup")]
        public async Task<IActionResult> CreateGroup(string code, int courseId)
        {
            var course = await _dbContext.Courses.FindAsync(courseId);
            if (course == null)
            {
                return BadRequest("Course not found");
            }

            var group = new Group
            {
                Code = code,
                CourseId = courseId
            };

            _dbContext.Groups.Add(group);
            await _dbContext.SaveChangesAsync();

            return Ok(group);
        }

        [HttpPut("{id}", Name = "UpdateGroup")]
        public async Task<IActionResult> UpdateGroup(int id, int courseId, Group group)
        {
            if (id != group.Id)
            {
                return BadRequest("Invalid group ID");
            }

            var existingGroup = await _dbContext.Groups.FindAsync(id);
            if (existingGroup == null)
            {
                return NotFound("Group not found");
            }

            existingGroup.Code = group.Code;
            existingGroup.CourseId = courseId;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(existingGroup);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(id))
                {
                    return BadRequest("Group not found");
                }
                else
                {
                    throw;
                }
            }
        }

        [HttpDelete("{id}", Name = "DeleteGroup")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var group = await _dbContext.Groups.FindAsync(id);
            if (group == null)
            {
                return BadRequest("Group not found");
            }

            _dbContext.Groups.Remove(group);
            await _dbContext.SaveChangesAsync();

            return Ok("Group deleted");
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private bool GroupExists(int id)
        {
            return _dbContext.Groups.Any(e => e.Id == id);
        }
    }
}
