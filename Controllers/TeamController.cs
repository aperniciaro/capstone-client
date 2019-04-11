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
  public class TeamController : ControllerBase
  {
    private DatabaseContext db;
    public TeamController()
    {
      this.db = new DatabaseContext();
    }

    [HttpGet]
    public ActionResult<IList<Team>> GetAllTeams()
    {
      return db.Teams.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Team> GetSingleTeam(int id)
    {
      var team = db.Teams.FirstOrDefault(f => f.Id == id);
      return team;
    }

    [HttpPost("all")]
    public ActionResult<Team[]> CreateAllTeams([FromBody] Team[] teamsToAdd)
    {
      db.Teams.AddRange(teamsToAdd);
      db.SaveChanges();
      return teamsToAdd;
    }

    [HttpPost]
    public ActionResult<Team> CreateTeam([FromBody] Team newTeam)
    {
      db.Teams.Add(newTeam);
      db.SaveChanges();
      return newTeam;
    }



    [HttpPut("{id}")]
    public ActionResult<Team> UpdateTeam(int id, [FromBody] Team newTeamData)
    {
      newTeamData.Id = id;
      db.Entry(newTeamData).State = EntityState.Modified;

      db.SaveChanges();
      return newTeamData;
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteTeam(int id)
    {
      var team = db.Teams.FirstOrDefault(f => f.Id == id);
      db.Teams.Remove(team);
      db.SaveChanges();
      return Ok();
    }
  }
}