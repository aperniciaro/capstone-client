using Microsoft.EntityFrameworkCore.Migrations;

namespace content.Migrations
{
    public partial class RevisedPlayerModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "AtBats",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "AverageAgainst",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "BatsFrom",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "BattingAverage",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "ERA",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "HomeRuns",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "HomerunRate",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "InningsPitched",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "JerseyNumber",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "KRate",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "OnBase",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "RBIs",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "Runs",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "Slugging",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "Steals",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "ThrowsFrom",
                table: "Players");

            migrationBuilder.RenameColumn(
                name: "WalkRate",
                table: "Players",
                newName: "ProjIP");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProjIP",
                table: "Players",
                newName: "WalkRate");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AtBats",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "AverageAgainst",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "BatsFrom",
                table: "Players",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "BattingAverage",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ERA",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "HomeRuns",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "HomerunRate",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "InningsPitched",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "JerseyNumber",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "KRate",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "OnBase",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "RBIs",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Runs",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Slugging",
                table: "Players",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Steals",
                table: "Players",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ThrowsFrom",
                table: "Players",
                nullable: true);
        }
    }
}
