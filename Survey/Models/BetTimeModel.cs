using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Survey.Models
{
    public class BetTimeModel
    {
        public int BetTimeId { get; set; }
        public int GameDataId { get; set; }
        public int Order { get; set; }
        public DateTime BetMadeTime { get; set; }
    }
}