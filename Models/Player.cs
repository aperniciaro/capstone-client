namespace capstone_client.Models
{
  public class Player
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int Position { get; set; }
    public int Age { get; set; }
    public int YearsPlayed { get; set; }
    public Roster Roster { get; set; }
  }
}