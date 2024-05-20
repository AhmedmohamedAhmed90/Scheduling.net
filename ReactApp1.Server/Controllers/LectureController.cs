using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LectureController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public LectureController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("ByGroup/{groupId}", Name = "GetLecturesByGroupId")]
        public async Task<ActionResult<IEnumerable<Lecture>>> GetLecturesByGroupId(int groupId)
        {
            var lectures = await _dbContext.Lectures
                .Where(l => l.GroupId == groupId)
                .ToListAsync();

            return Ok(lectures);
        }

        [HttpGet("{id}", Name = "GetLecture")]
        public async Task<ActionResult<object>> GetLecture(int id)


        {
            var lecture = await _dbContext.Lectures
    .Include(l => l.Group).ThenInclude(g => g.Course)

    .FirstOrDefaultAsync(l => l.Id == id);

            if (lecture == null)
            {
                return NotFound("Lecture not found");
            }

            var result = new
            {
                LectureId = lecture.Id,
                Lecture = lecture
            };

            return Ok(result);
        }
        [HttpPost(Name = "CreateLecture")]
        public async Task<IActionResult> CreateLecture(string startTime, string endTime, string day, string room, int groupId)
        {
            var group = await _dbContext.Groups.FindAsync(groupId);
            if (group == null)
            {
                return BadRequest("Group not found");
            }

            var lecture = new Lecture
            {
                StartTime = startTime,
                EndTime = endTime,
                Day = day,
                Room = room,
                GroupId = groupId
            };

            _dbContext.Lectures.Add(lecture);
            await _dbContext.SaveChangesAsync();

            return Ok(lecture);
        }

        [HttpPut("{id}/{groupId}", Name = "UpdateLecture")]
        public async Task<IActionResult> UpdateLecture(int id, int groupId, Lecture lecture)
        {
            if (id != lecture.Id)
            {
                return BadRequest("Invalid lecture ID");
            }



            var existingLecture = await _dbContext.Lectures.FindAsync(id);
            if (existingLecture == null)
            {
                return NotFound("Lecture not found");
            }
            if (existingLecture.GroupId != groupId)
            {
                return BadRequest("Invalid instructor ID for the course");
            }

            existingLecture.StartTime = lecture.StartTime;
            existingLecture.EndTime = lecture.EndTime;
            existingLecture.Day = lecture.Day;
            existingLecture.Room = lecture.Room;
            existingLecture.GroupId = groupId;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(existingLecture);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LectureExists(id))
                {
                    return BadRequest("Lecture not found");
                }
                else
                {
                    throw;
                }
            }
        }

        [HttpDelete("{id}", Name = "DeleteLecture")]
        public async Task<IActionResult> DeleteLecture(int id)
        {
            var lecture = await _dbContext.Lectures.FindAsync(id);
            if (lecture == null)
            {
                return BadRequest("Lecture not found");
            }

            _dbContext.Lectures.Remove(lecture);
            await _dbContext.SaveChangesAsync();

            return Ok("Lecture deleted");
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private bool LectureExists(int id)
        {
            return _dbContext.Lectures.Any(e => e.Id == id);
        }
    }
}
