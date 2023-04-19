using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackEnd.Models
{
    public class Data
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string PhNo { get; set; }
        public string Email { get; set; }
        public int CountryId { get; set; }
        public int StateId { get; set; }
        public string Remarks { get; set; }
        public string GSTEnable { get; set; }
        public string CreatedDate { get; set; }
        public byte Status { get; set; }

    }
}