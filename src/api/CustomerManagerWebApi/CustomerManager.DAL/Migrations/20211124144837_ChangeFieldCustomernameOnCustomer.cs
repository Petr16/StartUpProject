using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerManager.DAL.Migrations
{
    public partial class ChangeFieldCustomernameOnCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "customername",
                schema: "CustomerManagerSchema",
                table: "customers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "customername",
                schema: "CustomerManagerSchema",
                table: "customers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
