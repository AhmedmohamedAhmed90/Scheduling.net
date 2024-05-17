using System.Text;
using Newtonsoft.Json;
using ReactApp1.Server.Interfaces;

public class WhatsAppNotification : INotification
{
    public async Task NotifyAsync(string username, string password, string phoneNumber)
    {
        var payload = new
        {
            phoneNumber = phoneNumber,
            message = $"Your credentials for the University Account:\nUsername: {username}\nPassword: {password}"
        };

        using (var client = new HttpClient())
        {
            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("YOUR_WHATSAPP_API_ENDPOINT", content);
            response.EnsureSuccessStatusCode();
        }
    }
}