using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "399ae0db-7fc6-4f33-885b-99642b39161b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eef8dabd-b0ef-4223-aa54-ff6b887499f1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "958f3a0c-1652-4bc8-af9d-b5ffd9c1fee1", null, "User", "USER" },
                    { "e5e78769-470f-4bce-adeb-52b76be610d3", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "399ae0db-7fc6-4f33-885b-99642b39161b", null, "User", "USER" },
                    { "eef8dabd-b0ef-4223-aa54-ff6b887499f1", null, "Admin", "ADMIN" }
                });
        }
    }
}
