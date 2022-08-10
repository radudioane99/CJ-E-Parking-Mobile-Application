using Microsoft.EntityFrameworkCore.Migrations;

namespace BusinessLayer.Migrations
{
    public partial class FixNamingIssue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HardwareCalculatedNumberOfPlacews",
                table: "Locations",
                newName: "HardwareCalculatedNumberOfPlaces");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HardwareCalculatedNumberOfPlaces",
                table: "Locations",
                newName: "HardwareCalculatedNumberOfPlacews");
        }
    }
}
