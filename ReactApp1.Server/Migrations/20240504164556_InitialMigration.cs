using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "958f3a0c-1652-4bc8-af9d-b5ffd9c1fee1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e5e78769-470f-4bce-adeb-52b76be610d3");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c4d74962-4875-4cc4-a283-8ba3025e7214", null, "User", "USER" },
                    { "eb1eb780-aec1-4a4f-aa92-8da75c34e174", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c4d74962-4875-4cc4-a283-8ba3025e7214");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb1eb780-aec1-4a4f-aa92-8da75c34e174");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "958f3a0c-1652-4bc8-af9d-b5ffd9c1fee1", null, "User", "USER" },
                    { "e5e78769-470f-4bce-adeb-52b76be610d3", null, "Admin", "ADMIN" }
                });
        }
    }
}
