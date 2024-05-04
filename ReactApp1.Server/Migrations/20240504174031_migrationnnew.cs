using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class migrationnnew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exceptions_AspNetUsers_StudentId1",
                table: "Exceptions");

            migrationBuilder.DropIndex(
                name: "IX_Exceptions_StudentId1",
                table: "Exceptions");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "670d9d9b-c156-4f10-9c5b-e5db46581fb9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f190cf5d-bb36-460f-abcc-a2b2c2386832");

            migrationBuilder.DropColumn(
                name: "StudentId1",
                table: "Exceptions");

            migrationBuilder.AlterColumn<string>(
                name: "StudentId",
                table: "Exceptions",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8b836aa3-d80a-477f-b7a6-91c441a84c2f", null, "Admin", "ADMIN" },
                    { "9d3f6361-bff0-47e0-a536-f95c954457ca", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exceptions_StudentId",
                table: "Exceptions",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exceptions_AspNetUsers_StudentId",
                table: "Exceptions",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exceptions_AspNetUsers_StudentId",
                table: "Exceptions");

            migrationBuilder.DropIndex(
                name: "IX_Exceptions_StudentId",
                table: "Exceptions");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b836aa3-d80a-477f-b7a6-91c441a84c2f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9d3f6361-bff0-47e0-a536-f95c954457ca");

            migrationBuilder.AlterColumn<int>(
                name: "StudentId",
                table: "Exceptions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentId1",
                table: "Exceptions",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "670d9d9b-c156-4f10-9c5b-e5db46581fb9", null, "User", "USER" },
                    { "f190cf5d-bb36-460f-abcc-a2b2c2386832", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exceptions_StudentId1",
                table: "Exceptions",
                column: "StudentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Exceptions_AspNetUsers_StudentId1",
                table: "Exceptions",
                column: "StudentId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
