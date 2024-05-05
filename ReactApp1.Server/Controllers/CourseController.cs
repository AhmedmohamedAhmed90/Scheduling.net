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
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CourseController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

       [HttpGet("{instructorId}",Name = "GetCourses")]
          public async Task<ActionResult<IEnumerable<object>>> GetCoursesByInstructor(int instructorId)
          {
             var courses = await _dbContext.Courses
             .Include(c => c.Instructor)
             .Where(c => c.InstructorId == instructorId)
             .Select(c => new
        {
            CourseId = c.Id,
            Course = c
        })
        .ToListAsync();

             return Ok(courses);
          }

      [HttpGet(Name = "GetCourse")]
public async Task<ActionResult<object>> GetCourse(string groupCode)
{
    var course = await _dbContext.Courses
        .Include(c => c.Groups)
        .FirstOrDefaultAsync(c => c.Groups.Any(g => g.Code == groupCode));

    if (course == null)
    {
        return NotFound("Course not found");
    }

      var result = new
    {
        CourseId = course.Id,
        Course = course
    };

    return Ok(result);
}

        [HttpPost(Name = "CreateCourse")]
        public async Task<IActionResult> CreateCourse(string code, string title, string description, int instructorId)
        {
            var instructor = await _dbContext.Instructors.FindAsync(instructorId);
            if (instructor == null)
            {
                return BadRequest("Instructor not found");
            }

            var course = new Course
            {
                Code = code,
                Title = title,
                Description = description,
                InstructorId = instructorId
            };

            _dbContext.Courses.Add(course);

            var courseInstructor = new CourseInstructor
            {
                CoursesId = course.Id,
                InstructorsId = instructorId,
                Course = course,
                Instructor = instructor
            };

            _dbContext.CourseInstructors.Add(courseInstructor);

            await _dbContext.SaveChangesAsync();

            return Ok(course);
        }
[HttpPut("{id}/{instructorId}", Name = "UpdateCourse")]
public async Task<IActionResult> UpdateCourse(int id, int instructorId, Course courseUpdate)
{
    if (id != courseUpdate.Id)
    {
        return BadRequest("Invalid course ID");
    }

    var existingCourse = await _dbContext.Courses.FindAsync(id);
    if (existingCourse == null)
    {
        return NotFound("Course not found");
    }

    if (existingCourse.InstructorId != instructorId)
    {
        return BadRequest("Invalid instructor ID for the course");
    }

    existingCourse.Code = courseUpdate.Code;
    existingCourse.Title = courseUpdate.Title;
    existingCourse.Description = courseUpdate.Description;
    existingCourse.InstructorId=instructorId;

    try
    {
        await _dbContext.SaveChangesAsync();
        return Ok(existingCourse);
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!CourseExists(id))
        {
            return BadRequest("Course not found");
        }
        else
        {
            throw;
        }
    }
}


[HttpPut("{id}/{instructorId}UpdateInstructor", Name = "UpdateCourseInstructor")]
public async Task<IActionResult> UpdateCourseInstructor(int id, int instructorId)
{
    var existingCourse = await _dbContext.Courses.FindAsync(id);
    if (existingCourse == null)
    {
        return NotFound("Course not found");
    }

    var courseInstructor = await _dbContext.CourseInstructors.FirstOrDefaultAsync(ci => ci.CoursesId == id);
    if (courseInstructor != null)
    {
        courseInstructor.InstructorsId = instructorId;
    }

    existingCourse.InstructorId = instructorId;

    try
    {
        await _dbContext.SaveChangesAsync();
        return Ok(existingCourse);
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!CourseExists(id))
        {
            return BadRequest("Course not found");
        }
        else
        {
            throw;
        }
    }
}



        [HttpDelete("{id}", Name = "DeleteCourse")]
public async Task<IActionResult> DeleteCourse(int id)
{
    var course = await _dbContext.Courses.FindAsync(id);
    if (course == null)
    {
        return BadRequest("Course not found");
    }

    
    var courseInstructor = await _dbContext.CourseInstructors.FirstOrDefaultAsync(ci => ci.CoursesId == id);
    if (courseInstructor != null)
    {
        _dbContext.CourseInstructors.Remove(courseInstructor);
    }

   
    var groups = await _dbContext.Groups.Where(g => g.CourseId == id).ToListAsync();
    _dbContext.Groups.RemoveRange(groups);

    _dbContext.Courses.Remove(course);
    await _dbContext.SaveChangesAsync();

    return Ok("Course deleted");
}



        [ApiExplorerSettings(IgnoreApi = true)]
        private bool CourseExists(int id)
        {
            return _dbContext.Courses.Any(e => e.Id == id);
        }
    }
}
