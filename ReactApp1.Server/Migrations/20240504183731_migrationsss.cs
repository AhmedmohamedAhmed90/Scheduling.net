using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class migrationsss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exceptions_AspNetUsers_StudentId",
                table: "Exceptions");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b836aa3-d80a-477f-b7a6-91c441a84c2f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9d3f6361-bff0-47e0-a536-f95c954457ca");

            migrationBuilder.AlterColumn<string>(
                name: "StudentId",
                table: "Exceptions",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5c0cd1d2-f8de-43f5-9fb5-ba3af3e0fa2e", null, "Admin", "ADMIN" },
                    { "f7f66b12-00dc-402c-88ba-75132c0fb794", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Exceptions_AspNetUsers_StudentId",
                table: "Exceptions",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exceptions_AspNetUsers_StudentId",
                table: "Exceptions");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c0cd1d2-f8de-43f5-9fb5-ba3af3e0fa2e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7f66b12-00dc-402c-88ba-75132c0fb794");

            migrationBuilder.AlterColumn<string>(
                name: "StudentId",
                table: "Exceptions",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8b836aa3-d80a-477f-b7a6-91c441a84c2f", null, "Admin", "ADMIN" },
                    { "9d3f6361-bff0-47e0-a536-f95c954457ca", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Exceptions_AspNetUsers_StudentId",
                table: "Exceptions",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
