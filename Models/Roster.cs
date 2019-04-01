using System.Collections.Generic;

namespace capstone_client.Models
{
  public class Roster
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsCustom { get; set; } = false;
    public int ProjectedWins { get; set; }
    public Team Team { get; set; }
    public List<Player> Players { get; set; } = new List<Player>();

    //statistics
  }
}