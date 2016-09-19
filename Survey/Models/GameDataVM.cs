using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Survey.Models
{
    public class GameDataVM
    {
        public GameDataModel GameDTMod;
        public List<BetTimeModel> TimeList;

        public GameDataVM()
        {
            this.GameDTMod = new GameDataModel();
            this.TimeList = new List<BetTimeModel>();
        }
    }
}