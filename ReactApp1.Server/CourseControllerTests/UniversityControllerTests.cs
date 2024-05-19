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

public class UniversityControllerTests
{
    private readonly Mock<ApplicationDbContext> _mockContext;
    private readonly UniversityController _controller;

    public UniversityControllerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "asp")
            .Options;

        _mockContext = new Mock<ApplicationDbContext>(options);

        // Set up DbSet and DbContext
        var universities = new List<University>();
        var mockUniversityDbSet = CreateQueryableMockDbSet(universities);
        _mockContext.Setup(c => c.Universities).Returns(mockUniversityDbSet.Object);

        _controller = new UniversityController(_mockContext.Object);
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
    public async Task CreateUniversity_ReturnsOkResult_WithUniversity()
    {
        // Arrange
        var university = new University
        {
            Name = "Test University",
            Address = "123 Test Street",
            PhoneNumber = "123-456-7890"
        };

        _mockContext.Setup(m => m.SaveChangesAsync(default)).ReturnsAsync(1);

        // Act
        var result = await _controller.CreateUniversity(university);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnValue = Assert.IsType<University>(okResult.Value);
        Assert.Equal(university.Name, returnValue.Name);
        Assert.Equal(university.Address, returnValue.Address);
        Assert.Equal(university.PhoneNumber, returnValue.PhoneNumber);
        _mockContext.Verify(m => m.Universities.Add(It.IsAny<University>()), Times.Once);
        _mockContext.Verify(m => m.SaveChangesAsync(default), Times.Once);
    }
}
