using System.Collections.Generic;
using capstone_client.Models;

namespace capstone_client.ViewModels
{
  public class RosterViewModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsCustom { get; set; } = false;
    public int ProjectedWins { get; set; }
    public Team Team { get; set; }
    public List<Player> Players { get; set; } = new List<Player>();
  }
}