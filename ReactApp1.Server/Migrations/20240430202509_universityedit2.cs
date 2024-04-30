using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class universityedit2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "585e0c36-1266-4447-b736-3708d5ed0e90");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9c154cd4-89e4-4003-b2a7-85163dddbb9c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "74ae8473-efa6-4b1e-92e3-9404d58e0cdb", null, "Admin", "ADMIN" },
                    { "ea9d0b35-fa82-4d90-8ba7-0f8f18c4a25d", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "74ae8473-efa6-4b1e-92e3-9404d58e0cdb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ea9d0b35-fa82-4d90-8ba7-0f8f18c4a25d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "585e0c36-1266-4447-b736-3708d5ed0e90", null, "Admin", "ADMIN" },
                    { "9c154cd4-89e4-4003-b2a7-85163dddbb9c", null, "User", "USER" }
                });
        }
    }
}
