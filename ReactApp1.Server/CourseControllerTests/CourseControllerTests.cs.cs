using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using ReactApp1.Server.Controllers;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

public class CourseControllerTests
{
    private readonly Mock<ApplicationDbContext> _mockContext;
    private readonly CourseController _controller;

    public CourseControllerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "asp")
            .Options;
        
        _mockContext = new Mock<ApplicationDbContext>(options);

        // Create a mock DbSet<Course> and set it up to be returned by the mocked DbContext
        var mockCourseDbSet = CreateQueryableMockDbSet(new List<Course>());
        _mockContext.Setup(c => c.Set<Course>()).Returns(mockCourseDbSet.Object);

        _controller = new CourseController(_mockContext.Object);
    }

    private static Mock<DbSet<T>> CreateQueryableMockDbSet<T>(List<T> sourceList) where T : class
    {
        var queryable = sourceList.AsQueryable();
        var dbSet = new Mock<DbSet<T>>();

        dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
        dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
        dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
        dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
        dbSet.As<IAsyncEnumerable<T>>().Setup(m => m.GetAsyncEnumerator(default)).Returns(new TestAsyncEnumerator<T>(sourceList.GetEnumerator()));

        return dbSet;
    }

    private class TestAsyncEnumerator<T> : IAsyncEnumerator<T>
    {
        private readonly IEnumerator<T> _inner;

        public TestAsyncEnumerator(IEnumerator<T> inner)
        {
            _inner = inner;
        }

        public T Current => _inner.Current;

        public ValueTask DisposeAsync()
        {
            _inner.Dispose();
            return ValueTask.CompletedTask;
        }

        public ValueTask<bool> MoveNextAsync()
        {
            return new ValueTask<bool>(_inner.MoveNext());
        }
    }

    [Fact]
    public async Task GetCourse_ReturnsOkResult_WithCourses()
    {
        // Arrange
        var courses = new List<Course>
        {
            new Course { Id = 1, Title = "Course 1", Code = "C1", Description = "Description 1", Departmeant = "Department 1" },
            new Course { Id = 2, Title = "Course 2", Code = "C2", Description = "Description 2", Departmeant = "Department 2" }
        };
        var mockCourseDbSet = CreateQueryableMockDbSet(courses);
        _mockContext.Setup(c => c.Courses).Returns(mockCourseDbSet.Object); // Ensure you're using the correct property (Courses)

        // Act
        var result = await _controller.GetCourse();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<List<Course>>(okResult.Value);
        Assert.Equal(2, returnValue.Count);
    }

    [Fact]
    public async Task GetCourse_ReturnsNotFound_WhenNoCourses()
    {
        // Arrange
        var courses = new List<Course>(); // No courses in the list
        var mockCourseDbSet = CreateQueryableMockDbSet(courses);
        _mockContext.Setup(c => c.Courses).Returns(mockCourseDbSet.Object); // Ensure you're using the correct property (Courses)

        // Act
        var result = await _controller.GetCourse();

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
        Assert.Equal("Course not found", notFoundResult.Value);
    }
}
