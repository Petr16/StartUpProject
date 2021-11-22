using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerManager.DAL.Migrations
{
    public partial class ChangeFieldsOnCustomerAndStatusRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                schema: "CustomerManagerSchema",
                table: "status_requests");

            migrationBuilder.DropColumn(
                name: "name",
                schema: "CustomerManagerSchema",
                table: "customers");

            migrationBuilder.AddColumn<string>(
                name: "statusrequestname",
                schema: "CustomerManagerSchema",
                table: "status_requests",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "customername",
                schema: "CustomerManagerSchema",
                table: "customers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "statusrequestname",
                schema: "CustomerManagerSchema",
                table: "status_requests");

            migrationBuilder.DropColumn(
                name: "customername",
                schema: "CustomerManagerSchema",
                table: "customers");

            migrationBuilder.AddColumn<string>(
                name: "name",
                schema: "CustomerManagerSchema",
                table: "status_requests",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "name",
                schema: "CustomerManagerSchema",
                table: "customers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
