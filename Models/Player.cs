namespace capstone_client.Models
{
  public class Player
  {
    public int Id { get; set; }
    public int MlbId { get; set; }
    public string PlayerName { get; set; }
    public int Position { get; set; }
    public bool IsMoving { get; set; } = false;
    public int ProjRuns { get; set; } = 0;
    public double ProjERA { get; set; } = .000;
    public double ProjIP { get; set; } = 0;
    public Roster Roster { get; set; }
    public int? RosterId { get; set; }
  }
}