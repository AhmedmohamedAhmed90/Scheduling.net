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

        [HttpGet(Name = "GetCourses")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            var courses = await _dbContext.Courses.ToListAsync();
            return Ok(courses);
        }

        [HttpGet("{id}", Name = "GetCourse")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _dbContext.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound("Course not found");
            }
            return Ok(course);
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

[HttpPut("{id}", Name = "UpdateCourse")]
public async Task<IActionResult> UpdateCourse(int id, int instructorId, Course course)
{
    if (id != course.Id)
    {
        return BadRequest("Invalid course ID");
    }

    var existingCourse = await _dbContext.Courses.FindAsync(id);
    if (existingCourse == null)
    {
        return NotFound("Course not found");
    }

    existingCourse.Code = course.Code;
    existingCourse.Title = course.Title;
    existingCourse.Description = course.Description;
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

            _dbContext.Courses.Remove(course);
            await _dbContext.SaveChangesAsync();

            return Ok("Course deleted");
        }

        private bool CourseExists(int id)
        {
            return _dbContext.Courses.Any(e => e.Id == id);
        }
    }
}
