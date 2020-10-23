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
        private static readonly string cachePersonKey = "_person";
        private static readonly string cacheFeeKey = "_fee";

        public IMemoryCache Cache { get; }
        public MemCache()
        {
            Cache = new MemoryCache(new MemoryCacheOptions
            {
                SizeLimit = 2
            });
        }

        public void CachePerson(Person person)
        {
            Cache.Set(cachePersonKey, person, new MemoryCacheEntryOptions().SetSize(1));
        }

        public void CacheFee(Fee fee)
        {
            Cache.Set(cacheFeeKey, fee, new MemoryCacheEntryOptions().SetSize(1));
        }

        public Person GetPerson()
        {
            return Cache.Get(cachePersonKey) as Person;
        }

        public Fee GetFee()
        {
            return Cache.Get(cacheFeeKey) as Fee;
        }
    }
}
