using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
//using System.Diagnostics;

//using Microsoft.AspNetCore.Identity;

namespace ReactApp1.Server.Controllers;


[ApiController]
[Route("api/[controller]")]

public class StudentController : Controller
{
    private readonly ApplicationDbContext _dbContext;

   // private readonly IPasswordHasher<Student> _passwordHasher;
   //IPasswordHasher<Student> passwordHasher
    public StudentController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        //_passwordHasher = passwordHasher;
    }



[HttpGet(Name = "GetStudents")]
public IActionResult Students()
{
    // Retrieve all products from the database
    var students = _dbContext.Set<Student>().ToList();
    //de tre2a tanya
    // var products = _dbContext.products.ToList();
     if (students == null)
            {
                return BadRequest();
            }
            return Ok(students);
}



// [HttpGet("/CreateStudent")]
// public IActionResult CreateStudent()
// {
//     // Your logic to handle the CreateProduct request
//     return View("CreateStudent"); // Assuming your view is named "CreateProduct.cshtml"
// }


private string GenerateRandomNumbers(int length)
        {
            Random random = new Random();
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }


[HttpPost (Name ="CreateStudents")]
public async Task<ActionResult> CreateStudents([FromForm] Student student)
{
    if (ModelState.IsValid)
    {
        // student.Password = _passwordHasher.HashPassword(student, student.Password);
       // Generate a username (student name + 4 random numbers)
        string username = student.Name.Replace(" ", "") + GenerateRandomNumbers(4);

        // Generate a password (6 random numbers)
        string password = GenerateRandomNumbers(6);

        // Assign the generated username and password to the student
        student.Username = username;
        student.Password = password;
        
        _dbContext.Set<Student>().Add(student);
        await _dbContext.SaveChangesAsync();

       
               
            return Ok(student);
    }
    else
    {
        // If model state is not valid, return to the form
        return BadRequest();
    }
}

[HttpGet("{id}", Name = "GetStudent")]
public IActionResult GetStudent(int id)
{
    var student = _dbContext.Set<Student>().Find(id);

    if (student == null)
    {
        return BadRequest();
    }

    // Pass the product to the view using ViewBag
    // ViewBag.Student = student;

    return Ok(student);
}


[HttpPut("{id}",Name ="EditStudents")]
[Consumes("application/x-www-form-urlencoded")]
public async Task<IActionResult> EditStudents(string id, [FromForm] Student updatedStudent)
{
    if (ModelState.IsValid)
    {
        try
        {
            // Retrieve the existing product from the database
            var existingStudent = _dbContext.Set<Student>().Find(updatedStudent.Id);

            if (existingStudent == null)
            {
               return BadRequest(); // Or handle the case where the product is not found
            }

            // Update the existing product with the changes
            existingStudent.Name = updatedStudent.Name;
            existingStudent.Address = updatedStudent.Address;
            existingStudent.Age = updatedStudent.Age;
            existingStudent.Year = updatedStudent.Year;
            existingStudent.Faculty = updatedStudent.Faculty;
            existingStudent.Email = updatedStudent.Email;

            // Save changes to the database
            ///momken nsheel de 3ady
            _dbContext.Update(existingStudent);
            await _dbContext.SaveChangesAsync();

            // Redirect to the product list page after successful editing
            return Ok(existingStudent);
        }
        catch (Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException)
        {
            // Handle concurrency exceptions if needed
            throw;
        }
    }

    // If model state is not valid, return to the edit form with the same product data
    return BadRequest();
}



[HttpPut("{id}",Name ="EditStudent")]
[Consumes("application/x-www-form-urlencoded")]
public async Task<IActionResult> EditStudent(string id, [FromForm] Student updatedStudent)
{
    if (ModelState.IsValid)
    {
        try
        {
            // Retrieve the existing product from the database
            var existingStudent = _dbContext.Set<Student>().Find(updatedStudent.Id);

            if (existingStudent == null)
            {
               return BadRequest(); // Or handle the case where the product is not found
            }

           
            existingStudent.Username=updatedStudent.Username;
            existingStudent.Password=updatedStudent.Password;

            // Save changes to the database
            ///momken nsheel de 3ady
            _dbContext.Update(existingStudent);
            await _dbContext.SaveChangesAsync();

            // Redirect to the product list page after successful editing
            return Ok(existingStudent);
        }
        catch (Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException)
        {
            // Handle concurrency exceptions if needed
            throw;
        }
    }

    // If model state is not valid, return to the edit form with the same product data
    return BadRequest();
}



[HttpDelete("{id}",Name ="DeleteStudent")]
public async Task<IActionResult> DeleteStudent(int id)
{
    var student = await _dbContext.Set<Student>().FindAsync(id);
    if (student == null)
    {
        return BadRequest(); // Return 404 if the product is not found
    }

   _dbContext.Set<Student>().Remove(student);
    await _dbContext.SaveChangesAsync();

    return Ok("Deleted"); // Redirect to the product list page
}
    // public IActionResult Privacy()
    // {
    //     return View();
    // }

    // [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    // public IActionResult Error()
    // {
    //     return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    // }
}
