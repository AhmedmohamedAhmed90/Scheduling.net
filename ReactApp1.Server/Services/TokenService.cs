using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Microsoft.IdentityModel.Tokens;
using ReactApp1.Server.Interfaces;
using ReactApp1.Server.Models;


namespace ReactApp1.Server.Services
{
    public class TokenService : ITokenService
    { 
        private  readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _config =config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
        }
        public string CreateToken(Student student)
        {
            var Claims= new List<Claim>
            {
               new Claim(JwtRegisteredClaimNames.Email , student.Email),
               new Claim(JwtRegisteredClaimNames.GivenName , student.UserName)
            };
            var creds = new SigningCredentials(_key , SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
              Subject=new ClaimsIdentity(Claims),
              Expires=DateTime.Now.AddDays(7),
              SigningCredentials=creds,
              Issuer=_config["JWT:Issuer"],
              Audience=_config["JWT:Audience"],


            };
            var Tokenhandler = new JwtSecurityTokenHandler();
            var Token = Tokenhandler.CreateToken(tokenDescriptor);

            return Tokenhandler.WriteToken(Token);
        }
    }
}