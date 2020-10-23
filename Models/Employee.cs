using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using react_poc.Validation;

namespace react_poc.Models
{
    public class Employee
    {
        [ValidEmployeeName]
        public string Name { get; set; }

        [ValidSSN]
        public string SSN { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; }

        public bool IsFullTime { get; set; }
    }
}
