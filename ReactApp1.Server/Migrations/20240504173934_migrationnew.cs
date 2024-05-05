using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class migrationnew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "670d9d9b-c156-4f10-9c5b-e5db46581fb9", null, "User", "USER" },
                    { "f190cf5d-bb36-460f-abcc-a2b2c2386832", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "670d9d9b-c156-4f10-9c5b-e5db46581fb9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f190cf5d-bb36-460f-abcc-a2b2c2386832");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c4d74962-4875-4cc4-a283-8ba3025e7214", null, "User", "USER" },
                    { "eb1eb780-aec1-4a4f-aa92-8da75c34e174", null, "Admin", "ADMIN" }
                });
        }
    }
}
