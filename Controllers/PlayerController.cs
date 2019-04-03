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
      return db.Players.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Player> GetPlayer(int id)
    {
      var player = db.Players.FirstOrDefault(f => f.Id == id);
      return player;
    }

    [HttpPost]
    public ActionResult<Player> CreatePlayer([FromBody] Player newPlayer)
    {
      db.Players.Add(newPlayer);
      db.SaveChanges();
      return newPlayer;
    }

    [HttpPut("{id}")]
    public ActionResult<Player> UpdatePlayer(int id, [FromBody] Player newPlayerData)
    {
      var player = db.Players.FirstOrDefault(f => f.Id == id);
      //change props
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