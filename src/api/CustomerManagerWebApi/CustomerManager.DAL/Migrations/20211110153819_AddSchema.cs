using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerManager.DAL.Migrations
{
    public partial class AddSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "CustomerManagerSchema");

            migrationBuilder.RenameTable(
                name: "requests",
                newName: "requests",
                newSchema: "CustomerManagerSchema");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "requests",
                schema: "CustomerManagerSchema",
                newName: "requests");
        }
    }
}
