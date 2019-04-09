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
      return db.Rosters.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Roster> GetSingleRoster(int id)
    {
      var roster = db.Rosters.Include(i => i.Players).FirstOrDefault(f => f.Id == id);
      return roster;
    }

    [HttpPost]
    public ActionResult<Roster> CreateRoster([FromBody] Roster incomingRoster)
    {
      // create a new roster
      // copy over incoming properties (not navigation)
      // save that new with 
      //assign new roster the team and players of the incmoing roster
      // save changes again
      Roster newRoster = (Roster)Activator.CreateInstance(typeof(Roster));
      newRoster.Id = incomingRoster.Id;
      newRoster.Name = incomingRoster.Name;
      newRoster.IsCustom = incomingRoster.IsCustom;
      newRoster.ProjectedWins = incomingRoster.ProjectedWins;
      db.Rosters.Add(newRoster);
      db.SaveChanges();
      newRoster.Team = incomingRoster.Team;
      newRoster.Players = incomingRoster.Players;
      return newRoster;
    }

    [HttpPut("{id}")]
    public ActionResult<Roster> UpdateRoster(int id, [FromBody] Roster newRosterData)
    {
      var roster = db.Rosters.FirstOrDefault(f => f.Id == id);
      roster.Name = newRosterData.Name;
      roster.IsCustom = newRosterData.IsCustom;
      // roster.Players = newRosterData.Players;
      db.SaveChanges();
      return roster;
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