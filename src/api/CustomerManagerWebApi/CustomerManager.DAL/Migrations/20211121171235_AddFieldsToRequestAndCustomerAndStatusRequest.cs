using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace CustomerManager.DAL.Migrations
{
    public partial class AddFieldsToRequestAndCustomerAndStatusRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "customer_id",
                schema: "CustomerManagerSchema",
                table: "requests",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "modify_date",
                schema: "CustomerManagerSchema",
                table: "requests",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "phone",
                schema: "CustomerManagerSchema",
                table: "requests",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "start_date",
                schema: "CustomerManagerSchema",
                table: "requests",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "target_execution_date",
                schema: "CustomerManagerSchema",
                table: "requests",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "customers",
                schema: "CustomerManagerSchema",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    customer_name = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_customers", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "status_requests",
                schema: "CustomerManagerSchema",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_status_requests", x => x.id);
                });

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
                name: "fk_requests_customers_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests",
                column: "status_request_id",
                principalSchema: "CustomerManagerSchema",
                principalTable: "customers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_requests_customers_customer_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropForeignKey(
                name: "fk_requests_customers_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropTable(
                name: "customers",
                schema: "CustomerManagerSchema");

            migrationBuilder.DropTable(
                name: "status_requests",
                schema: "CustomerManagerSchema");

            migrationBuilder.DropIndex(
                name: "ix_requests_customer_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropIndex(
                name: "ix_requests_status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropColumn(
                name: "customer_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropColumn(
                name: "modify_date",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropColumn(
                name: "phone",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropColumn(
                name: "start_date",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropColumn(
                name: "status_request_id",
                schema: "CustomerManagerSchema",
                table: "requests");

            migrationBuilder.DropColumn(
                name: "target_execution_date",
                schema: "CustomerManagerSchema",
                table: "requests");
        }
    }
}
