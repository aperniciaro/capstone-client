using Microsoft.EntityFrameworkCore.Migrations;

namespace content.Migrations
{
    public partial class BatsAndThrowsToStrings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Throws",
                table: "Players",
                nullable: true,
                oldClrType: typeof(char));

            migrationBuilder.AlterColumn<string>(
                name: "Bats",
                table: "Players",
                nullable: true,
                oldClrType: typeof(char));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<char>(
                name: "Throws",
                table: "Players",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<char>(
                name: "Bats",
                table: "Players",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
