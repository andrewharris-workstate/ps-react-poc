using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using react_poc.Validation;

namespace react_poc.Models
{
    public enum FeeType
    {
        [Description("Invalid")]
        Invalid = 0,
        [Description("Flat")]
        Flat = 1,
        [Description("Recurring")]
        Recurring = 2,
        [Description("Monthly")]
        Monthly = 3
    }

    public enum TriggerType
    {
        [Description("Invalid")]
        Invalid = 0,
        [Description("Open Merchant")]
        OpenMerchant = 1,
        [Description("Close Merchant")]
        CloseMerchant = 2,
        [Description("Account Change")]
        AccountChange = 3,
        [Description("Rate Review")]
        RateReview = 4,
        [Description("Chargeback")]
        Chargeback = 5,
        [Description("ACH Reject")]
        ACHReject = 6,
        [Description("ACH Request")]
        ACHRequest = 7
    }

    public class Fee
    {
        [ValidFeeName]
        public string Name { get; set; }

        public decimal Amount { get; set; }

        [ValidFeeType]
        public FeeType FeeType { get; set; }

        [ValidTriggerType]
        public TriggerType TriggerType { get; set; }
    }

    public class DropDownOption
    {
        public static readonly DropDownOption[] FeeTypes = ((FeeType[])Enum.GetValues(typeof(FeeType)))
            .Select(type => new DropDownOption((int)type, GetEnumDescription(type)))
            .ToArray();

        public static readonly DropDownOption[] TriggerTypes = ((TriggerType[])Enum.GetValues(typeof(TriggerType)))
            .Select(type => new DropDownOption((int)type, GetEnumDescription(type)))
            .ToArray();

        private DropDownOption(int id, string desc)
        {
            Id = id;
            Desc = desc;
        }

        public int Id { get; }
        public string Desc { get; }

        private static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes = fi.GetCustomAttributes(typeof(DescriptionAttribute), false) as DescriptionAttribute[];

            if (attributes != null && attributes.Any())
            {
                return attributes.First().Description;
            }

            return value.ToString();
        }
    }
}
