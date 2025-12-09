using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerPath.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSummaryToSteps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "RoadmapSteps",
                type: "character varying(300)",
                maxLength: 300,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Summary",
                table: "RoadmapSteps");
        }
    }
}
