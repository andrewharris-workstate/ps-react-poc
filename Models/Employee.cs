using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_poc.Models
{
    public class Employee
    {
        public string Name { get; set; }
        public string SSN { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsFullTime { get; set; }
    }
}
