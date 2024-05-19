using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using System.Net.Mail;  
using System.Net;
using Exception = System.Exception;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text;
using System.Net.Http;
using Microsoft.AspNetCore.Identity;
//using System.Diagnostics;

//using Microsoft.AspNetCore.Identity;

namespace ReactApp1.Server.Controllers;


[ApiController]
[Route("api/[controller]")]

public class StudentController : Controller
{
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<Student> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

   // private readonly IPasswordHasher<Student> _passwordHasher;
   //IPasswordHasher<Student> passwordHasher
   public StudentController(UserManager<Student> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
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

// [ApiExplorerSettings(IgnoreApi = true)]
// public async Task SendEmailAsync(string receiver, string subject, string username, string password)
// {
//     try
//     {
//         if (ModelState.IsValid)
//         {
//             var senderEmail = new MailAddress("melkmeshi@wakeb.ly", "Melk_Meshi");
//             var receiverEmail = new MailAddress(receiver);
//             var emailSubject = subject;
//             var emailBody = $"Your username is: {username}\nYour password is: {password}";

//             var smtp = new SmtpClient
//             {
//                 Host = "ls45.server.ly",
//                 Port = 465,
//                 EnableSsl = true,
//                 DeliveryMethod = SmtpDeliveryMethod.Network,
//                 UseDefaultCredentials = false,
//                 Credentials = new NetworkCredential(senderEmail.Address, "MohElk13241")
//             };

//             using var message = new MailMessage(senderEmail, receiverEmail)
//             {
//                 Subject = emailSubject,
//                 Body = emailBody
//             };
//             await smtp.SendMailAsync(message);
//         }
//     }
//     catch (Exception)
//     {
//         ViewBag.Error = "Some Error";
//     }
// }




    [HttpPost]
    [Route("CreateStudents")]
    public async Task<ActionResult> CreateStudents([FromForm] Student student)
    {
        if (ModelState.IsValid)
        {
            // Generate a username (student name + 4 random numbers)
            string username = student.Name.Replace(" ", "") + GenerateRandomNumbers(4);

            // Generate a password (6 random numbers)
            string password = GenerateRandomNumbers(15) +  'a' + 'A' + '@';
            string studentEmail = student.Email;

            // Assign the generated username and password to the student
            student.UserName = username;
            var result = await _userManager.CreateAsync(student, password);

            if (result.Succeeded)
            {
                // Ensure the role exists
                if (!await _roleManager.RoleExistsAsync("User"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("User"));
                }

                // Assign the "User" role to the student
                await _userManager.AddToRoleAsync(student, "User");

                // Send email to the student
                var payload = new
                {
                    email = student.Email,
                    subject = "Your credentials for the University Account",
                    body = $"Username: {username}\nPassword: {password}"
                };

                // Use HttpClient to send the request
                using (var client = new HttpClient())
                {
                    var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
                    var response = await client.PostAsync("https://prod-68.westeurope.logic.azure.com:443/workflows/c13c5def438d4022b868c634ed180d89/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qToVLIyTj0GzNMDn79DNHb0vRsW4QFu_s0KGzVWRDj8", content);
                    response.EnsureSuccessStatusCode();
                    Console.WriteLine(await response.Content.ReadAsStringAsync());
                }

                return Ok(student);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }
        else
        {
            return BadRequest("Problem with model state");
        }
    }


[HttpGet("{id}", Name = "GetStudent")]
public IActionResult GetStudent(String id)
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
           // existingStudent.Address = updatedStudent.Address;
           // existingStudent.Age = updatedStudent.Age;
            //existingStudent.Year = updatedStudent.Year;
            //existingStudent.Faculty = updatedStudent.Faculty;
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

            existingStudent.PasswordHash  = password;

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
