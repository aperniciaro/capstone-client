using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace content.Migrations
{
  public partial class ModifiedTeamAndPlayerModels : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.RenameColumn(
          name: "Name",
          table: "Teams",
          newName: "TeamName");

      migrationBuilder.RenameColumn(
          name: "YearsPlayed",
          table: "Players",
          newName: "Steals");

      migrationBuilder.RenameColumn(
          name: "Name",
          table: "Players",
          newName: "PlayerName");

      migrationBuilder.AlterColumn<string>(
          name: "Division",
          table: "Teams",
          nullable: true,
          oldClrType: typeof(string[]),
          oldNullable: true);

      migrationBuilder.AddColumn<int>(
          name: "MlbId",
          table: "Teams",
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

      migrationBuilder.AddColumn<char>(
          name: "Bats",
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

      migrationBuilder.AddColumn<int>(
          name: "MlbId",
          table: "Players",
          nullable: false,
          defaultValue: 0);

      migrationBuilder.AddColumn<double>(
          name: "OnBase",
          table: "Players",
          nullable: false,
          defaultValue: 0.0);

      migrationBuilder.AddColumn<double>(
          name: "ProjERA",
          table: "Players",
          nullable: false,
          defaultValue: 0.0);

      migrationBuilder.AddColumn<int>(
          name: "ProjRuns",
          table: "Players",
          nullable: false,
          defaultValue: 0);

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

      migrationBuilder.AddColumn<char>(
          name: "Throws",
          table: "Players",
          nullable: true);

      migrationBuilder.AddColumn<double>(
          name: "WalkRate",
          table: "Players",
          nullable: false,
          defaultValue: 0.0);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropColumn(
          name: "MlbId",
          table: "Teams");

      migrationBuilder.DropColumn(
          name: "AtBats",
          table: "Players");

      migrationBuilder.DropColumn(
          name: "AverageAgainst",
          table: "Players");

      migrationBuilder.DropColumn(
          name: "Bats",
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
          name: "MlbId",
          table: "Players");

      migrationBuilder.DropColumn(
          name: "OnBase",
          table: "Players");

      migrationBuilder.DropColumn(
          name: "ProjERA",
          table: "Players");

      migrationBuilder.DropColumn(
          name: "ProjRuns",
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
          name: "Throws",
          table: "Players");

      migrationBuilder.DropColumn(
          name: "WalkRate",
          table: "Players");

      migrationBuilder.RenameColumn(
          name: "TeamName",
          table: "Teams",
          newName: "Name");

      migrationBuilder.RenameColumn(
          name: "Steals",
          table: "Players",
          newName: "YearsPlayed");

      migrationBuilder.RenameColumn(
          name: "PlayerName",
          table: "Players",
          newName: "Name");

      migrationBuilder.AlterColumn<string[]>(
          name: "Division",
          table: "Teams",
          nullable: true,
          oldClrType: typeof(string),
          oldNullable: true);
    }
  }
}
