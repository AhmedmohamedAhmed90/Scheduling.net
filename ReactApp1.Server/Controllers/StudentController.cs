using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using System.Net.Mail;  
using System.Net;
using Exception = System.Exception;
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

[ApiExplorerSettings(IgnoreApi = true)]
protected string GenerateRandomNumbers(int length)
        {
            Random random = new Random();
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

// [ApiExplorerSettings(IgnoreApi = true)]
// public async Task SendEmailAsync(string receiver, string subject, string username, string password)
// {
//     try
//     {
//         if (ModelState.IsValid)
//         {
//             var senderEmail = new MailAddress("ahmed.mohamed1.jan.2003@gmail.com", "Ahmed Mohamed");
//             var receiverEmail = new MailAddress(receiver, "Receiver");
//             var emailSubject = subject;
//             var emailBody = $"Your username is: {username}\nYour password is: {password}";

//             var smtp = new SmtpClient
//             {
//                 Host = "smtp.gmail.com",
//                 Port = 587,
//                 EnableSsl = true,
//                 DeliveryMethod = SmtpDeliveryMethod.Network,
//                 UseDefaultCredentials = false,
//                 Credentials = new NetworkCredential(senderEmail.Address, "MA01273400173")
//             };

//                 using var message = new MailMessage(senderEmail, receiverEmail)
//                 {
//                     Subject = emailSubject,
//                     Body = emailBody
//                 };
//                 await smtp.SendMailAsync(message);
//             }
//     }
//     catch (Exception)
//     {
//         ViewBag.Error = "Some Error";
//     }
// }

[ApiExplorerSettings(IgnoreApi = true)]
public async Task SendEmailAsync(string receiver, string subject, string username, string password)
{
    try
    {
        if (ModelState.IsValid)
        {
            var senderEmail = new MailAddress("melkmeshi@wakeb.ly", "Melk_Meshi");
            var receiverEmail = new MailAddress(receiver);
            var emailSubject = subject;
            var emailBody = $"Your username is: {username}\nYour password is: {password}";

            var smtp = new SmtpClient
            {
                Host = "ls45.server.ly",
                Port = 465,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(senderEmail.Address, "MohElk13241?")
            };

            using var message = new MailMessage(senderEmail, receiverEmail)
            {
                Subject = emailSubject,
                Body = emailBody
            };
            await smtp.SendMailAsync(message);
        }
    }
    catch (Exception)
    {
        ViewBag.Error = "Some Error";
    }
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
        string studentEmail= student.Email.ToString();

        // Assign the generated username and password to the student
        student.Username = username;
        student.Password = password;
        
        _dbContext.Set<Student>().Add(student);
        await _dbContext.SaveChangesAsync();

        // Send email to the student
        try{

        await SendEmailAsync(studentEmail, "your university account's username and password", username, password);

        }catch(Exception ex){
            return Ok("problem:"+ex.Message);
        }
               
            return Ok(student);
    }
    else
    {
        // If model state is not valid, return to the form
        //return BadRequest();
        return Ok("problem");
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

[HttpPut("{id}/password", Name = "EditStudentPassword")]
[Consumes("application/x-www-form-urlencoded")]
public async Task<IActionResult> EditStudentPassword(string id, [FromForm] string password)
{
    if (ModelState.IsValid)
    {
        try
        {
            
            if (!int.TryParse(id, out int studentId))
            {
                return BadRequest("Invalid student ID");
            }

            
            var existingStudent = await _dbContext.Set<Student>().FindAsync(studentId);

            if (existingStudent == null)
            {
                return BadRequest("Student not found");
            }

            existingStudent.Password = password;

            _dbContext.Update(existingStudent);
            await _dbContext.SaveChangesAsync();

            return Ok(existingStudent);
        }
        catch (Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException)
        {
           
            throw;
        }
    }

    
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