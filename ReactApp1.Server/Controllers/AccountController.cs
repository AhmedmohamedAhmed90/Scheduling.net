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
        public AccountController(UserManager<Student> userManager, ITokenService TokenService, SignInManager<Student> signin)
        {
            visitor = userManager;
            _TokenService = TokenService;
            _signin = signin;

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await visitor.Users.FirstOrDefaultAsync(x => x.UserName == login.Username!.ToLower());

            if (user == null) return Unauthorized("the user not found");

            var result = await _signin.CheckPasswordSignInAsync(user, login.Password!, false);

            if (!result.Succeeded) return Unauthorized("Invalid UserName and / or password");

            return Ok(
                new NewUser
                {
                    UserName = user.UserName!,
                    Email = user.Email!,
                    Id = user.Id,
                    Token = await _TokenService.CreateToken(user)
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register registerDto)
        {
            try
            {
                // if (!ModelState.IsValid)
                // {
                //     return BadRequest(ModelState);
                // }
                Console.WriteLine(registerDto);
                Console.WriteLine("1");
                Console.WriteLine(registerDto.UniversityName!, registerDto.UniversityAddress!, registerDto.UniversityPhoneNumber!
                );
                var university = new University
                {
                    Name = registerDto.UniversityName!,
                    Address = registerDto.UniversityAddress!,
                    PhoneNumber = registerDto.UniversityPhoneNumber!,
                };
                Console.WriteLine(university);
                Console.WriteLine("2");
                Console.WriteLine(registerDto.Email, registerDto.Password!
                , registerDto.Password, university.Id
                );
                var student = new Student
                {
                    Name = registerDto.Email,
                    UserName = registerDto.Email,
                    Email = registerDto.Email,
                    Year = "2024",
                    Address = registerDto.UniversityAddress!,
                    Faculty = "Faculty",
                    PasswordHash = registerDto.Password,
                    UniversityId = university.Id,
                    University = university,
                };
                var createUser = await visitor.CreateAsync(student, registerDto.Password!);
                if (createUser.Succeeded)
                {
                    var Result = await visitor.AddToRoleAsync(student, "Admin");
                    if (Result.Succeeded)
                    {
                        return Ok(new NewUser
                        {
                            Id = student.Id,
                            Email = student.Email!,
                            Role = "Admin",
                            isAdmin = true,
                            Token = await _TokenService.CreateToken(student)
                        });
                    }
                    else
                    {
                        return StatusCode(500, Result.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createUser.Errors);
                }
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signin.SignOutAsync();
            return Ok("User logged out successfully");
        }


    }

}