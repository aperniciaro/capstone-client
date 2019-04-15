using Microsoft.EntityFrameworkCore.Migrations;

namespace content.Migrations
{
    public partial class ChangedPlayerPositionToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Position",
                table: "Players",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Position",
                table: "Players",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
