using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SriCare.Core.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roaming",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Activate = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedBy = table.Column<string>(type: "text", nullable: false),
                    CreatedDateTime = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ModifiedBy = table.Column<string>(type: "text", nullable: false),
                    ModifiedDateTime = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roaming", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoamingPlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RoamingId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlanName = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    Validity = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SMSQuota = table.Column<int>(type: "integer", nullable: false),
                    CallQuota = table.Column<int>(type: "integer", nullable: false),
                    DataQuota = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoamingPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoamingPlans_Roaming_RoamingId",
                        column: x => x.RoamingId,
                        principalTable: "Roaming",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Roaming_UserId",
                table: "Roaming",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RoamingPlans_RoamingId",
                table: "RoamingPlans",
                column: "RoamingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoamingPlans");

            migrationBuilder.DropTable(
                name: "Roaming");
        }
    }
}
