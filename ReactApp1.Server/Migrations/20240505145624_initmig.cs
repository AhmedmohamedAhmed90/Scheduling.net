using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReactApp1.Server.Migrations
{
    /// <inheritdoc />
    public partial class initmig : Migration
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
                keyValue: "5c0cd1d2-f8de-43f5-9fb5-ba3af3e0fa2e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7f66b12-00dc-402c-88ba-75132c0fb794");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Exceptions");

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
                    { "461cd4cc-5803-41e5-9b8b-6e2f07fdeda0", null, "User", "USER" },
                    { "59ad4004-e51b-4224-9f5e-883bd302919a", null, "Admin", "ADMIN" }
                });

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

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "461cd4cc-5803-41e5-9b8b-6e2f07fdeda0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "59ad4004-e51b-4224-9f5e-883bd302919a");

            migrationBuilder.AlterColumn<string>(
                name: "StudentId",
                table: "Exceptions",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Priority",
                table: "Exceptions",
                type: "longtext",
                nullable: false);

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
    }
}
