using Microsoft.EntityFrameworkCore.Migrations;

namespace CustomerManager.DAL.Migrations
{
    public partial class ToDiffDependenciesOfRequests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_requests_customers_customer_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropForeignKey(
                name: "fk_requests_status_requests_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropIndex(
                name: "ix_requests_customer_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropIndex(
                name: "ix_requests_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "ix_requests_customer_id",
                schema: "CustomerManagerSchema",
                table: "requests",
                column: "customer_id");

            migrationBuilder.CreateIndex(
                name: "ix_requests_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests",
                column: "status_request_id");

            migrationBuilder.AddForeignKey(
                name: "fk_requests_customers_customer_id",
                schema: "CustomerManagerSchema",
                table: "requests",
                column: "customer_id",
                principalSchema: "CustomerManagerSchema",
                principalTable: "customers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

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
    }
}
