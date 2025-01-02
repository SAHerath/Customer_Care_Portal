using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SriCare.Core.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddActivePlanTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ActivePlanId",
                table: "RoamingPlans",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "ActivePlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlanName = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    Validity = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SMSQuota = table.Column<int>(type: "integer", nullable: false),
                    CallQuota = table.Column<int>(type: "integer", nullable: false),
                    DataQuota = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivePlans", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoamingPlans_ActivePlanId",
                table: "RoamingPlans",
                column: "ActivePlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoamingPlans_ActivePlans_ActivePlanId",
                table: "RoamingPlans",
                column: "ActivePlanId",
                principalTable: "ActivePlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoamingPlans_ActivePlans_ActivePlanId",
                table: "RoamingPlans");

            migrationBuilder.DropTable(
                name: "ActivePlans");

            migrationBuilder.DropIndex(
                name: "IX_RoamingPlans_ActivePlanId",
                table: "RoamingPlans");

            migrationBuilder.DropColumn(
                name: "ActivePlanId",
                table: "RoamingPlans");
        }
    }
}
