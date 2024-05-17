using System;
using ReactApp1.Server.Interfaces;

public abstract class NotificationFactory
{
    public abstract INotification CreateNotification();

    public static NotificationFactory GetFactory(string method)
    {
        return method.ToLower() switch
        {
            "email" => new EmailNotificationFactory(),
            "whatsapp" => new WhatsAppNotificationFactory(),
            _ => throw new ArgumentException("Invalid notification method")
        };
    }
}
