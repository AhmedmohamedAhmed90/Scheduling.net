using System.Text;
using Newtonsoft.Json;
using ReactApp1.Server.Interfaces;

public class WhatsAppNotification : INotification
{
    public async Task NotifyAsync(string username, string password, string phoneNumber)
    {
       var payload = new
        {
            username = "melkmeshi",
            phoneNumber = "2"+phoneNumber,
            message = $"Your credentials for the University Account:\nUsername: {username}\nPassword: {password}"
        };

        using (var client = new HttpClient())
        {
            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var request = new HttpRequestMessage(HttpMethod.Post, "https://arkanly-12d20baff04d.herokuapp.com")
            {
                Content = content
            };

            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
        }
    }
}