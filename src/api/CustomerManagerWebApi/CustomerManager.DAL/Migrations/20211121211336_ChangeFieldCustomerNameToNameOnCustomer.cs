using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerManager.DAL.Migrations
{
    public partial class ChangeFieldCustomerNameToNameOnCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "customer_name",
                schema: "CustomerManagerSchema",
                table: "customers");

            migrationBuilder.AddColumn<int>(
                name: "name",
                schema: "CustomerManagerSchema",
                table: "customers",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                schema: "CustomerManagerSchema",
                table: "customers");

            migrationBuilder.AddColumn<int>(
                name: "customer_name",
                schema: "CustomerManagerSchema",
                table: "customers",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
