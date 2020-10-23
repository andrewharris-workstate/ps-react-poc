using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using react_poc.Models;
namespace react_poc
{
    public class MemCache
    {
        private static readonly string cacheEmployeeKey = "_employee";
        private static readonly string cacheFeeKey = "_fee";

        public IMemoryCache Cache { get; }
        public MemCache()
        {
            Cache = new MemoryCache(new MemoryCacheOptions
            {
                SizeLimit = 2
            });
        }

        public void CacheEmployee(Employee employee)
        {
            if (GetEmployee() != null)
                Cache.Remove(cacheEmployeeKey);

            Cache.Set(cacheEmployeeKey, employee, new MemoryCacheEntryOptions().SetSize(1));
        }

        public void CacheFee(Fee fee)
        {
            if (GetFee() != null)
                Cache.Remove(cacheFeeKey);

            Cache.Set(cacheFeeKey, fee, new MemoryCacheEntryOptions().SetSize(1));
        }

        public Employee GetEmployee()
        {
            return Cache.Get(cacheEmployeeKey) as Employee;
        }

        public Fee GetFee()
        {
            return Cache.Get(cacheFeeKey) as Fee;
        }
    }
}
