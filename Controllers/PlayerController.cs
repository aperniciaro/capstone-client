using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using capstone_client.Models;
using content;

namespace capstone_client.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PlayerController : ControllerBase
  {
    private DatabaseContext db;
    public PlayerController()
    {
      this.db = new DatabaseContext();
    }

    [HttpGet]
    public ActionResult<IList<Player>> GetAllPlayers()
    {
      return db.Players.OrderBy(o => o.PlayerName).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Player> GetPlayer(int id)
    {
      var player = db.Players.FirstOrDefault(f => f.Id == id);
      return player;
    }

    // [HttpPost]
    // public ActionResult<Player> CreatePlayer([FromBody] Player newPlayer)
    // {
    //   db.Players.Add(newPlayer);
    //   db.SaveChanges();
    //   return newPlayer;
    // }

    [HttpPost("{rosterId}")]
    public ActionResult<Player[]> CreateMultiplePlayers([FromBody] Player[] playersToAdd, [FromRoute] int rosterId)
    {
      foreach (var player in playersToAdd)
      {
        player.RosterId = rosterId;
      }
      db.Players.AddRange(playersToAdd);
      db.SaveChanges();
      return playersToAdd;
    }

    [HttpPut("{id}")]
    public ActionResult<Player> UpdatePlayer(int id, [FromBody] Player newPlayerData)
    {
      newPlayerData.Id = id;
      db.Entry(newPlayerData).State = EntityState.Modified;

      db.SaveChanges();
      return newPlayerData;
    }

    [HttpPut("{id}/move")]
    public ActionResult<Player> UpdatePlayer(int id)
    {
      var player = db.Players.FirstOrDefault(f => f.Id == id);
      player.IsMoving = !player.IsMoving;
      db.SaveChanges();
      return player;
    }

    [HttpPut("{id}/changeteam")]
    public ActionResult<Player> ChangeTeamOfPlayer(int id, [FromBody] int? newRoster)
    {
      var player = db.Players.FirstOrDefault(f => f.Id == id);
      if (newRoster == -1)
      {
        newRoster = null;
      }
      player.RosterId = newRoster;
      db.SaveChanges();
      return player;
    }

    [HttpDelete("{id}")]
    public ActionResult DeletePlayer(int id)
    {
      var player = db.Players.FirstOrDefault(f => f.Id == id);
      db.Players.Remove(player);
      db.SaveChanges();
      return Ok();
    }
  }
}