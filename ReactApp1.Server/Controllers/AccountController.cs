using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
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
        public AccountController(UserManager<Student> userManager ,ITokenService TokenService )
        {
            visitor=userManager;
            _TokenService=TokenService;
    
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
                    UserName=registerDto.Username,
                    Email=registerDto.Email,
                    Faculty=registerDto.Faculty,
                    Address=registerDto.Address,
                    Age = registerDto.Age,
                    Year=registerDto.Year,
                    Name=registerDto.Name
                     
                };
            var createUser = await  visitor.CreateAsync(student , registerDto.Password);
            if(createUser.Succeeded){
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
 }

}