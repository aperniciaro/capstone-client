using Microsoft.EntityFrameworkCore.Migrations;

namespace content.Migrations
{
    public partial class BatsAndThrowsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Throws",
                table: "Players",
                newName: "ThrowsFrom");

            migrationBuilder.RenameColumn(
                name: "Bats",
                table: "Players",
                newName: "BatsFrom");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ThrowsFrom",
                table: "Players",
                newName: "Throws");

            migrationBuilder.RenameColumn(
                name: "BatsFrom",
                table: "Players",
                newName: "Bats");
        }
    }
}
