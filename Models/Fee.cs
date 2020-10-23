using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react_poc.Models
{
    public enum FeeType
    {
        Invalid = 0,
        Flat = 1,
        Recurring = 2,
        Monthly = 3
    }

    public enum TriggerType
    {
        Invalid = 0,
        OpenMerchant = 1,
        CloseMerchant = 2,
        AccountChange = 3,
        RateReview = 4,
        Chargeback = 5,
        ACHReject = 6,
        ACHRequest = 7
    }

    public class Fee
    {
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public FeeType FeeType { get; set; }
        public TriggerType TriggerType { get; set; }
    }

    public class DropDownOption
    {
        public static readonly DropDownOption[] FeeTypes = ((FeeType[])Enum.GetValues(typeof(FeeType)))
            .Select(type => new DropDownOption((int)type, Enum.GetName(typeof(FeeType), type)))
            .ToArray();

        public static readonly DropDownOption[] TriggerTypes = ((TriggerType[])Enum.GetValues(typeof(TriggerType)))
            .Select(type => new DropDownOption((int)type, Enum.GetName(typeof(TriggerType), type)))
            .ToArray();

        private DropDownOption(int id, string desc)
        {
            Id = id;
            Desc = desc;
        }

        public int Id { get; }
        public string Desc { get; }
    }
}
