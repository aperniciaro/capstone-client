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


  }
}