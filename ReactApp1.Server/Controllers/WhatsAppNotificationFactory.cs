using ReactApp1.Server.Interfaces;

public class WhatsAppNotificationFactory : NotificationFactory
{
    public override INotification CreateNotification()
    {
        return new WhatsAppNotification();
    }
}