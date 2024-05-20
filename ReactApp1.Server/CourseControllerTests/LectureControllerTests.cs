using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Controllers;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

public class LectureControllerTests
{
    private ApplicationDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "asp")
            .Options;

        var context = new ApplicationDbContext(options);

        
        context.Groups.Add(new Group { Id = 1, Code = "Group 1" });
        context.Lectures.Add(new Lecture { Id = 1, StartTime = "08:00", EndTime = "09:00", Day = "Monday", Room = "Room 1", GroupId = 1 });
        context.SaveChanges();

        return context;
    }

    [Fact]
    public async Task GetLecturesByGroupId_ReturnsOkResult()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        // Act
        var result = await controller.GetLecturesByGroupId(1);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.IsType<List<Lecture>>(actionResult.Value);
    }

    [Fact]
    public async Task GetLecture_ReturnsOkResult_WhenLectureExists()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        // Act
        var result = await controller.GetLecture(1);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var resultValue = Assert.IsType<dynamic>(actionResult.Value);
        Assert.Equal(1, resultValue.LectureId);
    }

    [Fact]
    public async Task GetLecture_ReturnsNotFound_WhenLectureDoesNotExist()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        // Act
        var result = await controller.GetLecture(999);

        // Assert
        var actionResult = Assert.IsType<NotFoundObjectResult>(result.Result);
        Assert.Equal("Lecture not found", actionResult.Value);
    }

    [Fact]
    public async Task CreateLecture_ReturnsOkResult_WhenGroupExists()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        // Act
        var result = await controller.CreateLecture("10:00", "11:00", "Tuesday", "Room 2", 1);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result);
        var lecture = Assert.IsType<Lecture>(actionResult.Value);
        Assert.Equal("Room 2", lecture.Room);
    }

    [Fact]
    public async Task CreateLecture_ReturnsBadRequest_WhenGroupDoesNotExist()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        // Act
        var result = await controller.CreateLecture("10:00", "11:00", "Tuesday", "Room 2", 999);

        // Assert
        var actionResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Group not found", actionResult.Value);
    }

    [Fact]
    public async Task UpdateLecture_ReturnsOkResult_WhenLectureExists()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        var lecture = new Lecture
        {
            Id = 1,
            StartTime = "09:00",
            EndTime = "10:00",
            Day = "Monday",
            Room = "Room 1",
            GroupId = 1
        };

        // Act
        var result = await controller.UpdateLecture(1, 1, lecture);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result);
        var updatedLecture = Assert.IsType<Lecture>(actionResult.Value);
        Assert.Equal("09:00", updatedLecture.StartTime);
    }

    [Fact]
    public async Task UpdateLecture_ReturnsBadRequest_WhenLectureIdMismatch()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        var lecture = new Lecture
        {
            Id = 2, // ID mismatch
            StartTime = "09:00",
            EndTime = "10:00",
            Day = "Monday",
            Room = "Room 1",
            GroupId = 1
        };

        // Act
        var result = await controller.UpdateLecture(1, 1, lecture);

        // Assert
        var actionResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid lecture ID", actionResult.Value);
    }

    [Fact]
    public async Task DeleteLecture_ReturnsOkResult_WhenLectureExists()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        // Act
        var result = await controller.DeleteLecture(1);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("Lecture deleted", actionResult.Value);
    }

    [Fact]
    public async Task DeleteLecture_ReturnsBadRequest_WhenLectureDoesNotExist()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new LectureController(context);

        // Act
        var result = await controller.DeleteLecture(999);

        // Assert
        var actionResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Lecture not found", actionResult.Value);
    }
}
