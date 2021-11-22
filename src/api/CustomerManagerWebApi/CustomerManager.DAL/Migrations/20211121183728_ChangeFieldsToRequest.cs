using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerManager.DAL.Migrations
{
    public partial class ChangeFieldsToRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_requests_customers_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.AddForeignKey(
                name: "fk_requests_status_requests_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests",
                column: "status_request_id",
                principalSchema: "CustomerManagerSchema",
                principalTable: "status_requests",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_requests_status_requests_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.AddForeignKey(
                name: "fk_requests_customers_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests",
                column: "status_request_id",
                principalSchema: "CustomerManagerSchema",
                principalTable: "customers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
