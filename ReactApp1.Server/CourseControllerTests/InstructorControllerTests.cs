using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Controllers;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

public class InstructorControllerTests
{
    private ApplicationDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "asp")
            .Options;

        var context = new ApplicationDbContext(options);

        
        context.Faculties.Add(new Faculty { Id = 1, Name = "Faculty 1", UniversityId = 1 });
        context.Instructors.Add(new Instructor { Id = 1, Name = "Instructor 1", FacultyId = 1 });
        context.SaveChanges();

        return context;
    }

    [Fact]
    public async Task GetInstructors_ReturnsOkResult()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        // Act
        var result = await controller.GetInstructors();

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        Assert.IsType<List<Instructor>>(actionResult.Value);
    }

    [Fact]
    public async Task GetInstructorsByUniversityId_ReturnsOkResult_WhenInstructorsExist()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        // Act
        var result = await controller.GetInstructorsByUniversityId(1);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var instructors = Assert.IsType<List<object>>(actionResult.Value);
        Assert.Single(instructors);
    }

    [Fact]
    public async Task GetInstructorsByUniversityId_ReturnsNotFound_WhenInstructorsDoNotExist()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        // Act
        var result = await controller.GetInstructorsByUniversityId(999);

        // Assert
        var actionResult = Assert.IsType<NotFoundObjectResult>(result.Result);
        Assert.Equal("Instructor not found", actionResult.Value);
    }

    [Fact]
    public async Task CreateInstructor_ReturnsOkResult_WhenFacultyExists()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        var instructor = new Instructor
        {
            Name = "New Instructor",
            FacultyId = 1
        };

        // Act
        var result = await controller.CreateInstructor(1, instructor);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result);
        var createdInstructor = Assert.IsType<Instructor>(actionResult.Value);
        Assert.Equal("New Instructor", createdInstructor.Name);
    }

    [Fact]
    public async Task CreateInstructor_ReturnsBadRequest_WhenFacultyDoesNotExist()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        var instructor = new Instructor
        {
            Name = "New Instructor",
            FacultyId = 999 // Non-existent faculty
        };

        // Act
        var result = await controller.CreateInstructor(999, instructor);

        // Assert
        var actionResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Faculty not found", actionResult.Value);
    }

    [Fact]
    public async Task UpdateInstructor_ReturnsOkResult_WhenInstructorExists()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        var updatedInstructor = new Instructor
        {
            Id = 1,
            Name = "Updated Instructor",
            FacultyId = 1
        };

        // Act
        var result = await controller.UpdateInstructor(1, 1, updatedInstructor);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result);
        var instructor = Assert.IsType<Instructor>(actionResult.Value);
        Assert.Equal("Updated Instructor", instructor.Name);
    }

    [Fact]
    public async Task UpdateInstructor_ReturnsBadRequest_WhenInstructorIdMismatch()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        var instructor = new Instructor
        {
            Id = 2, // ID mismatch
            Name = "Updated Instructor",
            FacultyId = 1
        };

        // Act
        var result = await controller.UpdateInstructor(1, 1, instructor);

        // Assert
        var actionResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Invalid instructor ID", actionResult.Value);
    }

    [Fact]
    public async Task DeleteInstructor_ReturnsOkResult_WhenInstructorExists()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        // Act
        var result = await controller.DeleteInstructor(1, 1);

        // Assert
        var actionResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal("Instructor deleted", actionResult.Value);
    }

    [Fact]
    public async Task DeleteInstructor_ReturnsBadRequest_WhenInstructorDoesNotExist()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        // Act
        var result = await controller.DeleteInstructor(1, 999);

        // Assert
        var actionResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Instructor not found", actionResult.Value);
    }

    [Fact]
    public async Task DeleteInstructor_ReturnsBadRequest_WhenInstructorBelongsToDifferentFaculty()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new InstructorController(context);

        var instructor = new Instructor
        {
            Id = 2,
            Name = "Instructor 2",
            FacultyId = 2
        };

        context.Faculties.Add(new Faculty { Id = 2, Name = "Faculty 2", UniversityId = 2 });
        context.Instructors.Add(instructor);
        context.SaveChanges();

        // Act
        var result = await controller.DeleteInstructor(1, 2);

        // Assert
        var actionResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Instructor does not belong to the specified faculty", actionResult.Value);
    }
}
