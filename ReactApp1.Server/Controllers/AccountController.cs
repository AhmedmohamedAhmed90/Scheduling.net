using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Data;
using ReactApp1.Server.Dtos;
using ReactApp1.Server.Models;


namespace ReactApp1.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<Student> visitor;
        public AccountController(UserManager<Student> userManager)
        {
            visitor=userManager;
    
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
                    
                };
            var createUser = await  visitor.CreateAsync(student , registerDto.Password);
            if(createUser.Succeeded){
                 var Result = await visitor.AddToRoleAsync(student , "User");
                 if(Result.Succeeded){
                  return Ok("User Created");
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