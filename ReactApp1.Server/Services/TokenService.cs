using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<Student> _userManager;

        public TokenService(IConfiguration config, UserManager<Student> userManager)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            var signingKey = _config["JWT:SigningKey"];
            if (string.IsNullOrEmpty(signingKey))
            {
                throw new ArgumentException("JWT Signing Key is not configured.");
            }
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
        }

        public async Task<string> CreateToken(Student student)
        {
            if (student == null)
            {
                throw new ArgumentNullException(nameof(student));
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, student.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, student.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, student.Id)
            };

            // Get user roles and add them as claims
            var roles = await _userManager.GetRolesAsync(student);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7), // Use UTC for consistency
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"],
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
