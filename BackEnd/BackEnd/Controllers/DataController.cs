using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackEnd.Models;
namespace BackEnd.Controllers
{
    [RoutePrefix("Api/Details")]
    public class DataController : ApiController
    {
        CustomerEntities DB = new CustomerEntities();

        [Route("Show")]
        [HttpGet]
        public object Showdata()
        {
            var a = DB.CustomerFetch();
            return a;
        }

        [Route("Add")]
        [HttpPost]
        public object Add(Data sd)
        {
            var a = DB.CustomerEntry(sd.Name, sd.PhNo, sd.Email, sd.CountryId, sd.StateId, sd.Remarks, sd.CreatedDate, sd.GSTEnable, sd.Status = 2);
            return a;
        }

        [Route("Status")]
        [HttpPost]
        public object Status(Data sd)
        {
            var a = DB.StatusChange(sd.CustomerId , sd.Status);
            return a;
        }

        [Route("Update")]
        [HttpPut]
        public object Update(Data sd)
        {
            var a = DB.CustomerUpdate(sd.CustomerId, sd.Name, sd.PhNo, sd.Email, sd.CountryId, sd.StateId, sd.Remarks, sd.CreatedDate, sd.GSTEnable);
            return a;
        }

        [Route("AddCountry")]
        [HttpPost]
        public object Add(Country sd)
        {
            var a = DB.CountryEntry(sd.CountryName);
            return a;
        }

        [Route("ShowCountry")]
        [HttpGet]
        public object ShowCountry()
        {
            var a = DB.CountryFetch();
            return a;
        }

        [Route("ShowState")]
        [HttpGet]
        public object ShowState()
        {
            var a = DB.StateFetch();
            return a;
        }

        [Route("AddState")]
        [HttpPost]
        public object Add(StateName sd)
        {
            var a = DB.StateEntry(sd.State);
            return a;
        }

    }

}