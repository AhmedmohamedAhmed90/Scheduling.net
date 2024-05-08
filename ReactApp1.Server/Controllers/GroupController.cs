using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reactapp1.Server.Models;
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

       [HttpGet("{code}", Name = "GetGroup")]
public async Task<ActionResult<object>> GetGroup(string code)
{
    var group = await _dbContext.Groups
        .Include(g => g.Course)
        .FirstOrDefaultAsync(g => g.Code == code);

    if (group == null)
    {
        return NotFound("Group not found");
    }

    var result = new
    {
        groupId = group.Id,
        courseId = group.CourseId,
        group = group
    };

    return Ok(result);
}


        [HttpPost(Name = "CreateGroup")]
public async Task<IActionResult> CreateGroup(string code, int courseId, int instructorId)
{
    var course = await _dbContext.Courses.FindAsync(courseId);
    if (course == null)
    {
        return BadRequest("Course not found");
    }

    var instructor = await _dbContext.Instructors.FindAsync(instructorId);
    if (instructor == null)
    {
        return BadRequest("Instructor not found");
    }

    var group = new Group
    {
        Code = code,
        CourseId = courseId,
        InstructorId = instructorId
    };
_dbContext.Groups.Add(group);
    var groupInstructor = new GroupInstructor
    {
        Group = group,
        Instructor = instructor
    };

    _dbContext.GroupInstructors.Add(groupInstructor); 
    await _dbContext.SaveChangesAsync();

    return Ok(group);
}


[HttpPut("{id}/{courseId}/{instructorId}", Name = "UpdateGroupCode")]
public async Task<IActionResult> UpdateGroupCode(int id, int courseId, int instructorId, string newCode)
{
    var existingGroup = await _dbContext.Groups.FindAsync(id);
    if (existingGroup == null)
    {
        return NotFound("Group not found");
    }

    if (existingGroup.InstructorId != instructorId)
    {
        return BadRequest("Invalid instructor ID for the group");
    }

    if (existingGroup.CourseId != courseId)
    {
        return BadRequest("Invalid Course ID for the group");
    }

    existingGroup.Code = newCode;

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



   [HttpPut("{id}/{instructorId}", Name = "UpdateGroupInstructor")]
public async Task<IActionResult> UpdateGroupInstructor(int id, int instructorId)
{
    var existingGroup = await _dbContext.Groups.FindAsync(id);
    if (existingGroup == null)
    {
        return NotFound("Group not found");
    }

    var instructor = await _dbContext.Instructors.FindAsync(instructorId);
    if (instructor == null)
    {
        return BadRequest("Instructor not found");
    }

   
    var existingGroupInstructor = await _dbContext.GroupInstructors.FirstOrDefaultAsync(gi => gi.GroupsId == id);
    if (existingGroupInstructor != null)
    {
        _dbContext.GroupInstructors.Remove(existingGroupInstructor);
    }

    
    await _dbContext.SaveChangesAsync();

  
    var newGroupInstructor = new GroupInstructor
    {
        GroupsId = id,
        InstructorsId = instructorId
    };

    
    _dbContext.GroupInstructors.Add(newGroupInstructor);

    
    existingGroup.InstructorId = instructorId;

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

   
    var groupInstructors = await _dbContext.GroupInstructors
                                        .Where(gi => gi.GroupsId == id)
                                        .ToListAsync();

   
    _dbContext.GroupInstructors.RemoveRange(groupInstructors);

  
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
