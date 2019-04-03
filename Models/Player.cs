namespace capstone_client.Models
{
  public class Player
  {
    public int Id { get; set; }
    public int MlbId { get; set; }
    public string PlayerName { get; set; }
    public int JerseyNumber { get; set; }
    public int Position { get; set; }
    public int Age { get; set; }
    public string BatsFrom { get; set; }
    public string ThrowsFrom { get; set; }
    public bool IsMoving { get; set; } = false;
    public int AtBats { get; set; } = 0;
    public double BattingAverage { get; set; } = .000;
    public double OnBase { get; set; } = .000;
    public double Slugging { get; set; } = .000;
    public int HomeRuns { get; set; } = 0;
    public int Runs { get; set; } = 0;
    public int RBIs { get; set; } = 0;
    public int Steals { get; set; } = 0;
    public int InningsPitched { get; set; } = 0;
    public double ERA { get; set; } = .000;
    public double KRate { get; set; } = .000;
    public double WalkRate { get; set; } = .000;
    public double HomerunRate { get; set; } = .000;
    public double AverageAgainst { get; set; } = .000;
    public int ProjRuns { get; set; } = 0;
    public double ProjERA { get; set; } = .000;
    public Roster Roster { get; set; }
  }
}