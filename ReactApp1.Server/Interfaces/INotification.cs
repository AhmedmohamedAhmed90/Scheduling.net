using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Interfaces;
public interface INotification
{
    Task NotifyAsync(string username, string password, string contactInfo);
}