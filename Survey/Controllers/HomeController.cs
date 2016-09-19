using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Survey.Models;

namespace Survey.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Index(GameDataModel dtModel)
        { 
            return View();
        }

        public ActionResult Manifest()
        {
            var manifest = "CACHE MANIFEST" + Environment.NewLine +
                  "# App Version: 1.0.9" + System.IO.File.GetLastWriteTime(Server.MapPath("~/Views/Home/Index.cshtml")) + Environment.NewLine +
                  "# Server Assembly Version: " + this.GetType().Assembly.GetName().Version + Environment.NewLine +
                  "NETWORK:" + Environment.NewLine +
                  "*" + Environment.NewLine +
                  "CACHE:" + Environment.NewLine +
                  Url.Action("Index", "Home") + Environment.NewLine +
                  Url.Content("~/Content/site.css") + Environment.NewLine +
                  Url.Content("~/Content/bootstrap.min.css") + Environment.NewLine +
                  Url.Content("~/scripts/jquery-1.7.1.js") + Environment.NewLine +
                  Url.Content("~/scripts/bootstrap.min.js") + Environment.NewLine +
                  Url.Content("~/scripts/bootbox.min.js") + Environment.NewLine +
                  Url.Content("~/scripts/db.js") + Environment.NewLine +
                  Url.Content("~/scripts/Config.js") + Environment.NewLine +
                  Url.Content("~/scripts/DbManager.js") + Environment.NewLine +
                  Url.Content("~/scripts/index.js") + Environment.NewLine +
                  Url.Content("~/scripts/jquery.blockUI.js") + Environment.NewLine +
                  Url.Content("~/scripts/cache.js") + Environment.NewLine;

            return Content(manifest, "text/cache-manifest");
        }

        
    }
}
