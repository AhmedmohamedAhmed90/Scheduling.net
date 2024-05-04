using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApp1.Server.Controllers
{
[Route("api/exceptions")]
public class ExceptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

    public ExceptionsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Submit an exception request
    [HttpPost(Name = "CreateException")]
    public async Task<IActionResult> SubmitException(int exceptionId, string studentId , string reason ,string description,string status , string priority)
    {
         var Exception = await _context.Students.FindAsync(studentId);

         if(studentId == null){
             return BadRequest("Group not found");
         }
          var Exceptions = new Models.Exception
            {
                ExceptionId=exceptionId,
                StudentId = studentId,
                Reason = reason , 
                Description = description,
                Priority = priority ,
                Status = status
            };

        _context.Exceptions.Add(Exceptions);
        await _context.SaveChangesAsync();

        return Ok (
            new Models.Exception
            {
                ExceptionId=exceptionId,
                StudentId = studentId,
                Reason = reason , 
                Description = description,
                Priority = priority ,
                Status = status
            }

        );
    }

    // Get an exception by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetExceptionById(int id)
    {
        var exception = await _context.Exceptions.FindAsync(id);

        if (exception == null)
        {
            return NotFound();
        }

        return Ok(exception);
    }

    // Get all exceptions, sorted by priority
    [HttpGet]
    public async Task<IActionResult> GetExceptions()
    {
        var exceptions = await _context.Exceptions
            .Include(e => e.Student)
            .OrderByDescending(e => e.Priority == "high")
            .ToListAsync();

        return Ok(exceptions);
    }

    // Update the status of an exception
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateExceptionStatus(int id, [FromBody] string status)
    {
        var exception = await _context.Exceptions.FindAsync(id);

        if (exception == null)
        {
            return NotFound();
        }

        exception.Status = status;
        await _context.SaveChangesAsync();

        return NoContent();
    }
    }
}