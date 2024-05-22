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
   private ApplicationDbContext GetInMemoryDbContext(string dbName)
{
    var options = new DbContextOptionsBuilder<ApplicationDbContext>()
        .UseInMemoryDatabase(databaseName: dbName)
        .Options;

    var context = new ApplicationDbContext(options);

    // Seed data
    context.Groups.Add(new Group { Id = 50, Code = "Group 1" });
    context.Lectures.Add(new Lecture { Id = 30, StartTime = "08:00", EndTime = "09:00", Day = "Monday", Room = "Room 1", GroupId = 50 });
    context.SaveChanges();

    return context;
}


   [Fact]
public async Task GetLecturesByGroupId_ReturnsOkResult()
{
    // Arrange
    var context = GetInMemoryDbContext(nameof(GetLecturesByGroupId_ReturnsOkResult));
    var controller = new LectureController(context);

    // Act
    var result = await controller.GetLecturesByGroupId(50);

    // Assert
    var actionResult = Assert.IsType<OkObjectResult>(result.Result);
    Assert.IsType<List<Lecture>>(actionResult.Value);
}



[Fact]
public async Task GetLecture_ReturnsNotFound_WhenLectureDoesNotExist()
{
    // Arrange
    var context = GetInMemoryDbContext(nameof(GetLecture_ReturnsNotFound_WhenLectureDoesNotExist));
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
    var context = GetInMemoryDbContext(nameof(CreateLecture_ReturnsOkResult_WhenGroupExists));
    var controller = new LectureController(context);

    // Act
    var result = await controller.CreateLecture("10:00", "11:00", "Tuesday", "Room 2", 50);

    // Assert
    var actionResult = Assert.IsType<OkObjectResult>(result);
    var lecture = Assert.IsType<Lecture>(actionResult.Value);
    Assert.Equal("Room 2", lecture.Room);
}

[Fact]
public async Task CreateLecture_ReturnsBadRequest_WhenGroupDoesNotExist()
{
    // Arrange
    var context = GetInMemoryDbContext(nameof(CreateLecture_ReturnsBadRequest_WhenGroupDoesNotExist));
    var controller = new LectureController(context);

    // Act
    var result = await controller.CreateLecture("10:00", "11:00", "Tuesday", "Room 2", 999);

    // Assert
    var actionResult = Assert.IsType<BadRequestObjectResult>(result);
    Assert.Equal("Group not found", actionResult.Value);
}

[Fact]
public async Task DeleteLecture_ReturnsOkResult_WhenLectureExists()
{
    // Arrange
    var context = GetInMemoryDbContext(nameof(DeleteLecture_ReturnsOkResult_WhenLectureExists));
    var controller = new LectureController(context);

    // Act
    var result = await controller.DeleteLecture(30);

    // Assert
    var actionResult = Assert.IsType<OkObjectResult>(result);
    Assert.Equal("Lecture deleted", actionResult.Value);
}

[Fact]
public async Task DeleteLecture_ReturnsBadRequest_WhenLectureDoesNotExist()
{
    // Arrange
    var context = GetInMemoryDbContext(nameof(DeleteLecture_ReturnsBadRequest_WhenLectureDoesNotExist));
    var controller = new LectureController(context);

    // Act
    var result = await controller.DeleteLecture(999);

    // Assert
    var actionResult = Assert.IsType<BadRequestObjectResult>(result);
    Assert.Equal("Lecture not found", actionResult.Value);
}
}


   

    
    
   
