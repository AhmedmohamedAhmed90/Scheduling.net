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
            var user = await visitor.Users.FirstOrDefaultAsync(x => x.UserName == login.Username.ToLower());

            if (user == null) return Unauthorized("the user not found");

            var result = await _signin.CheckPasswordSignInAsync(user, login.Password, false);

            if (!result.Succeeded) return Unauthorized("Invalid UserName and / or password");
            var roles = await visitor.GetRolesAsync(user);
            return Ok(
                new NewUser
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = roles[0],
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
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var student = new Student
                {
                    Name = registerDto.Name,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.Password,
                    Address = registerDto.Address,
                    Age = registerDto.Age,
                    Year = registerDto.Year,
                    Faculty = registerDto.Faculty,
                    PhoneNumber = registerDto.PhoneNumber
                };
                var createUser = await visitor.CreateAsync(student, registerDto.Password);
                if (createUser.Succeeded)
                {
                    var Result = await visitor.AddToRoleAsync(student, "Admin");
                    if (Result.Succeeded)
                    {
                        return Ok("User Created");
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

    }

}