using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using react_poc.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.DataProtection.KeyManagement.Internal;

namespace react_poc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactPOCController : ControllerBase
    {
        #region Records
        private static readonly GridRecord[] Records = new GridRecord[]
        {
            new GridRecord
            {
                Id = 0,
                FirstName = "Giacomo",
                LastName = "Guilizzoni",
                JobTitle = "Founder & CEO",
                Age = 40,
                NickName = null
            },
            new GridRecord
            {
                Id = 1,
                FirstName = "Marco",
                LastName = "Botton",
                JobTitle = "Tuttofare",
                Age = 38,
                NickName = null
            },
            new GridRecord
            {
                Id = 2,
                FirstName = "Mariah",
                LastName = "Maclachian",
                JobTitle = "Better Half",
                Age = 41,
                NickName = "Patata"
            },
            new GridRecord
            {
                Id = 3,
                FirstName = "Valerie",
                LastName = "Liberty",
                JobTitle = "Head Chef",
                Age = 55,
                NickName = "Val"
            },
            new GridRecord
            {
                Id = 4,
                FirstName = "Pickup",
                LastName = "Dropoff",
                JobTitle = "Driver",
                Age = 65,
                NickName = "Drop"
            },
            new GridRecord
            {
                Id = 5,
                FirstName = "Tom",
                LastName = "Magliozzi",
                JobTitle = "Mechanic",
                Age = 61,
                NickName = "Click"
            },
            new GridRecord
            {
                Id = 6,
                FirstName = "Ray",
                LastName = "Magliozzi",
                JobTitle = "Mechanic",
                Age = 70,
                NickName = "Clack"
            },
            new GridRecord
            {
                Id = 7,
                FirstName = "James",
                LastName = "Hendrix",
                JobTitle = "Guitarist",
                Age = 27,
                NickName = "Jimi"
            },
            new GridRecord
            {
                Id = 8,
                FirstName = "John",
                LastName = "Bonham",
                JobTitle = "Drummer",
                Age = 35,
                NickName = "Bon Bon"
            },
        };
        #endregion

        private readonly MemCache cache;

        public ReactPOCController(MemCache cache)
        {
            this.cache = cache;
        }

        [HttpGet("GridRecords")]
        public ICollection<GridRecord> GetGridRecords()
        {
            return Records;
        }

        [HttpGet("FeeTypes")]
        public ICollection<DropDownOption> GetFeeTypes()
        {
            return DropDownOption.FeeTypes;
        }

        [HttpGet("TriggerTypes")]
        public ICollection<DropDownOption> GetTriggerTypes()
        {
            return DropDownOption.TriggerTypes;
        }

        [HttpGet("Employee")]
        public Employee GetEmployee()
        {
            return cache.GetEmployee();
        }

        [HttpPost("Employee")]
        public void PostEmployee([FromBody] Employee employee)
        {
            cache.CacheEmployee(employee);
        }

        [HttpGet("Fee")]
        public Fee GetFee()
        {
            return cache.GetFee();
        }

        [HttpPost("Fee")]
        public void PostFee([FromBody] Fee fee)
        {
            cache.CacheFee(fee);
        }
    }
}
