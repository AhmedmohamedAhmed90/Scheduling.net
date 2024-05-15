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

        //    [HttpGet(Name = "GetCourses")]
        //       public async Task<ActionResult<IEnumerable<object>>> GetCourses()
        //       {
        //          var courses = await _dbContext.Courses
        //          .Include(c => c.Instructor)
        //          .Where(c => c.InstructorId == instructorId)
        //          .Select(c => new
        //     {
        //         CourseId = c.Id,
        //         Course = c
        //     })
        //     .ToListAsync();

        //          return Ok(courses);
        //       }

        // [HttpGet(Name = "GetCourse")]
        // public async Task<ActionResult<object>> GetCourse()
        // {
        //     var courses = await _dbContext.Courses
        //         .Select(c => new
        //         {
        //             CourseId = c.Id,
        //             Course = c
        //         })
        //         .ToListAsync();

        //     if (courses.Count == 0)
        //     {
        //         return NotFound("Course not found");
        //     }

        //     return Ok(courses);
        // }
        [HttpGet(Name = "GetAllCourse")]
        public async Task<ActionResult<object>> GetCourse()
        {
            var courses = await _dbContext.Courses
                .Include(c => c.Groups)
                    .ThenInclude(g => g.Lectures)
                .Include(c => c.Groups)
                    .ThenInclude(g => g.Instructor)
                .ToListAsync();

            if (courses.Count == 0)
            {
                return NotFound("Course not found");
            }
            return Ok(courses);
        }

        [HttpGet("{id}", Name = "GetCourse")]
        public async Task<ActionResult<object>> GetCourse(int id)
        {
            var course = await _dbContext.Courses.Include(i => i.Groups).FirstOrDefaultAsync(c => c.Id == id);
            if (course == null)
            {
                return NotFound("Course not found");
            }

            return Ok(course);
        }
        [HttpGet("ByFaculty/{facultyId}", Name = "GetCoursesByFacultyId")]
        public async Task<ActionResult<object>> GetCoursesByFacultyId(int facultyId)
        {
            var courses = await _dbContext.Courses
                .Where(course => course.FacultyCourses.Any(fc => fc.FacultyId == facultyId))
                .Select(course => new
                {
                    CourseId = course.Id,
                    Course = course
                })
                .ToListAsync();

            if (courses.Count == 0)
            {
                return NotFound("Courses not found for the given faculty ID");
            }

            return Ok(courses);
        }

        [HttpPost("{facultyId}", Name = "CreateCourse")]
        public async Task<IActionResult> CreateCourse(int facultyId, [FromBody] Course course)
        {
            var faculty = await _dbContext.Faculties.FindAsync(facultyId);
            if (faculty == null)
            {
                return BadRequest("Faculty not found");
            }

            var facultyCourse = new FacultyCourse
            {
                FacultyId = facultyId,
                Course = course
            };

            course.FacultyCourses = new List<FacultyCourse> { facultyCourse };

            _dbContext.Courses.Add(course);
            _dbContext.FacultyCourses.Add(facultyCourse);

            await _dbContext.SaveChangesAsync();

            return Ok(course);
        }


        [HttpPut("{id}", Name = "UpdateCourse")]
        public async Task<IActionResult> UpdateCourse(int id, Course courseUpdate)
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

            // if (existingCourse.InstructorId != instructorId)
            // {
            //     return BadRequest("Invalid instructor ID for the course");
            // }

            existingCourse.Code = courseUpdate.Code;
            existingCourse.Title = courseUpdate.Title;
            existingCourse.Description = courseUpdate.Description;
            existingCourse.Departmeant = courseUpdate.Departmeant;

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


        // [HttpPut("{id}/{instructorId}UpdateInstructor", Name = "UpdateCourseInstructor")]
        // public async Task<IActionResult> UpdateCourseInstructor(int id, int instructorId)
        // {
        //     var existingCourse = await _dbContext.Courses.FindAsync(id);
        //     if (existingCourse == null)
        //     {
        //         return NotFound("Course not found");
        //     }

        //     var courseInstructor = await _dbContext.CourseInstructors.FirstOrDefaultAsync(ci => ci.CoursesId == id);
        //     if (courseInstructor != null)
        //     {
        //         courseInstructor.InstructorsId = instructorId;
        //     }

        //     existingCourse.InstructorId = instructorId;

        //     try
        //     {
        //         await _dbContext.SaveChangesAsync();
        //         return Ok(existingCourse);
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!CourseExists(id))
        //         {
        //             return BadRequest("Course not found");
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        // }



        [HttpDelete("{id}", Name = "DeleteCourse")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _dbContext.Courses.FindAsync(id);
            if (course == null)
            {
                return BadRequest("Course not found");
            }

            try
            {
                var facultyCourse = await _dbContext.FacultyCourses.FirstOrDefaultAsync(fc => fc.CourseId == id);
                if (facultyCourse != null)
                {
                    _dbContext.FacultyCourses.Remove(facultyCourse);
                }

                var groups = await _dbContext.Groups.Where(g => g.CourseId == id).ToListAsync();
                var groupIds = groups.Select(g => g.Id).ToList();
                var groupInstructors = await _dbContext.GroupInstructors.Where(gi => groupIds.Contains(gi.GroupsId)).ToListAsync();
                _dbContext.GroupInstructors.RemoveRange(groupInstructors);
                _dbContext.Groups.RemoveRange(groups);

                _dbContext.Courses.Remove(course);

                await _dbContext.SaveChangesAsync();

                return Ok("Course deleted");
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occurred while deleting the course.");
            }
        }


        [ApiExplorerSettings(IgnoreApi = true)]
        private bool CourseExists(int id)
        {
            return _dbContext.Courses.Any(e => e.Id == id);
        }
    }
}
