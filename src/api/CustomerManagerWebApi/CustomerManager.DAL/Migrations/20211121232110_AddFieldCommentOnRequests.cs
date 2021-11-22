using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerManager.DAL.Migrations
{
    public partial class AddFieldCommentOnRequests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "comment",
                schema: "CustomerManagerSchema",
                table: "requests",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "comment",
                schema: "CustomerManagerSchema",
                table: "requests");
        }
    }
}
