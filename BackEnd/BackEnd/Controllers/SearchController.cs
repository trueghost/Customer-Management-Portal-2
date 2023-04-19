using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEnd.Models;
namespace BackEnd.Controllers
{
    [RoutePrefix("Api/SearchDate")]
    public class SearchdataController : ApiController
    {
        CustomerEntities DB = new CustomerEntities();

        [Route("Show")]
        [HttpGet]
        public object Showdata()
        {
            var a = DB.CustomerFetch();
            return a;
        }

        [Route("Search")]
        [HttpPost]
        public object Search(Search sd)
        {
            var a = DB.CustomerSearchDate(sd.startdate, sd.enddate);
            return a;
        }
    }
}