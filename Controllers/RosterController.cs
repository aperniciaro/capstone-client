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
  }
}