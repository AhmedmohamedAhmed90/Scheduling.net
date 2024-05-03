using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using ReactApp1.Server.Data;
using ReactApp1.Server.Dtos;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;


namespace ReactApp1.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<Student> visitor;
        private readonly ITokenService _TokenService;

        private readonly SignInManager<Student> _signin;
        public AccountController(UserManager<Student> userManager ,ITokenService TokenService , SignInManager<Student> signin )
        {
            visitor=userManager;
            _TokenService=TokenService;
            _signin = signin;    
    
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login login){
             if (!ModelState.IsValid){
                     return BadRequest(ModelState);
                }
            var user= await visitor.Users.FirstOrDefaultAsync(x=> x.UserName == login.Username.ToLower());    

            if (user ==null) return Unauthorized("the user not found");

            var result = await  _signin.CheckPasswordSignInAsync(user, login.Password , false);

            if (!result.Succeeded) return Unauthorized("Invalid UserName and / or password");

            return Ok(
                new NewUser{
                    UserName=user.UserName,
                    Email = user.Email,
                    Token = _TokenService.CreateToken(user)
                }
            );
        }

       [HttpPost("register")]
       public async Task<IActionResult> Register([FromBody] Register registerDto)
       {
          try{
                if (!ModelState.IsValid){
                     return BadRequest(ModelState);
                }
                
                var student= new Student
                {
                    // UserName=registerDto.Username,
                    Email=registerDto.Email,
                    Faculty=registerDto.Faculty,
                    Address=registerDto.Address,
                    Age = registerDto.Age,
                    Year=registerDto.Year,
                    Name=registerDto.Name

                };

                string username = registerDto.Name.Replace(" ", "") + GenerateRandomNumbers(4);
                student.UserName = username;
               
                string password = GenerateRandomNumbers(9)+"Aa#";

            var createUser = await  visitor.CreateAsync(student , password);
            if(createUser.Succeeded){
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
                 var Result = await visitor.AddToRoleAsync(student , "User");
                 if(Result.Succeeded){
                  return Ok(
                    new NewUser{
                        UserName=student.UserName,
                        Email = student.Email,
                        Token = _TokenService.CreateToken(student)
                    }
                  );
                }
                else{
                    return StatusCode(500 ,Result.Errors);
                 }
            }
            else {
                return StatusCode(500 , createUser.Errors);
            }
            }
        catch(System.Exception ex){
         return StatusCode(500 , ex.Message );
        }
    }

[ApiExplorerSettings(IgnoreApi = true)]
protected string GenerateRandomNumbers(int length)
        {
            Random random = new Random();
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }


 }



}