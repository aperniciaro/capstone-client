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
      var roster = db.Rosters.FirstOrDefault(f => f.Id == id);
      return roster;
    }

    [HttpPost]
    public ActionResult<Roster> CreateRoster([FromBody] Roster newRoster)
    {
      db.Rosters.Add(newRoster);
      db.SaveChanges();
      return newRoster;
    }

    [HttpPut("{id}")]
    public ActionResult<Roster> UpdateRoster(int id, [FromBody] Roster newRosterData)
    {
      var roster = db.Rosters.FirstOrDefault(f => f.Id == id);
      //change props
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