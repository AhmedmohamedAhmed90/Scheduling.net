using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class universityedit6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8549bdf1-91c3-42c8-bf21-ddce1a3abe01");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb2b9f5e-9497-43cd-a404-564cd8f443d8");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "CourseInstructors",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3de3384e-d19a-456f-aafc-d31d00cfaf9f", null, "User", "USER" },
                    { "3e52b360-56b9-4729-86e6-38c050bb8854", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3de3384e-d19a-456f-aafc-d31d00cfaf9f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3e52b360-56b9-4729-86e6-38c050bb8854");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CourseInstructors");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8549bdf1-91c3-42c8-bf21-ddce1a3abe01", null, "User", "USER" },
                    { "eb2b9f5e-9497-43cd-a404-564cd8f443d8", null, "Admin", "ADMIN" }
                });
        }
    }
}
