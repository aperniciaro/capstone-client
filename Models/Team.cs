using System.Collections.Generic;

namespace capstone_client.Models
{
  public class Team
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public string PrimaryColor { get; set; }
    public string SecondaryColor { get; set; }
    public string TertiaryColor { get; set; }
    public List<Roster> Rosters { get; set; } = new List<Roster>();
  }
}