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
    public ActionResult<IList<TeamViewModel>> GetAllTeams()
    {
      return db.Teams.Select(s => new TeamViewModel
      {
        Name = s.Name
      }).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Team> GetSingleTeam(int id)
    {
      var team = db.Teams.FirstOrDefault(f => f.Id == id);
      return team;
    }
  }
}