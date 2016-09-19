using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Survey.Models
{
    public class GameDataModel
    {
        public int Id {get; set;}
        public int TableId { get; set; }
        public string Coordinator { get; set; }
        public int NumberofPlayers { get; set; }
        public DateTime StartingTime { get; set; }
        
    }
}