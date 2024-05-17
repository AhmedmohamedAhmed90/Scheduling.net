using System.Text;
using Newtonsoft.Json;
using ReactApp1.Server.Interfaces;

public class EmailNotification : INotification
{
    public async Task NotifyAsync(string username, string password, string email)
    {
        var payload = new
        {
            email = email,
            subject = "Your credentials for the University Account",
            body = $"Username: {username}\nPassword: {password}"
        };

        using (var client = new HttpClient())
        {
             var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
                 var response = await client.PostAsync("https://prod-68.westeurope.logic.azure.com:443/workflows/c13c5def438d4022b868c634ed180d89/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qToVLIyTj0GzNMDn79DNHb0vRsW4QFu_s0KGzVWRDj8", content);
                 response.EnsureSuccessStatusCode();
                 Console.WriteLine(await response.Content.ReadAsStringAsync());
        }
    }
}