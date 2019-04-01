using System;
using System.Collections.Generic;

namespace capstone_client.Models
{
  public class Team
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public int[] PrimaryColor { get; set; } = new int[3];
    public int[] SecondaryColor { get; set; } = new int[3];
    public int[] TertiaryColor { get; set; } = new int[3];
    public List<Roster> Rosters { get; set; } = new List<Roster>();
  }
}