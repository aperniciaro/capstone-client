using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using capstone_client.Models;
using content;
using capstone_client.ViewModels;

namespace capstone_client.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class RosterController : ControllerBase
  {
    private DatabaseContext db;
    public RosterController()
    {
      this.db = new DatabaseContext();
    }

    [HttpGet]
    public ActionResult<IList<Roster>> GetAllRosters()
    {
      return db.Rosters.OrderBy(o => o.Name).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Roster> GetSingleRoster(int id)
    {
      var roster = db.Rosters.Include(i => i.Team).Include(i => i.Players).FirstOrDefault(f => f.Id == id);
      return roster;
    }

    [HttpPost]
    public ActionResult<Roster> CreateRoster([FromBody] Roster incomingRoster)
    {
      Roster newRoster = (Roster)Activator.CreateInstance(typeof(Roster));
      newRoster.Id = incomingRoster.Id;
      newRoster.Name = incomingRoster.Name;
      newRoster.IsCustom = incomingRoster.IsCustom;
      newRoster.ProjectedWins = incomingRoster.ProjectedWins;
      newRoster.TeamId = incomingRoster.TeamId;
      db.Rosters.Add(newRoster);
      db.SaveChanges();
      newRoster.Team = incomingRoster.Team;
      newRoster.Players = incomingRoster.Players;
      return newRoster;
    }

    [HttpPut("{id}")]
    public ActionResult<Roster> UpdateRoster(int id, [FromBody] Roster newRosterData)
    {
      newRosterData.Id = id;
      db.Entry(newRosterData).State = EntityState.Modified;

      db.SaveChanges();
      return newRosterData;
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteRoster(int id)
    {
      var roster = db.Rosters.FirstOrDefault(f => f.Id == id);
      db.Rosters.Remove(roster);
      db.SaveChanges();
      return Ok();
    }
  }
}