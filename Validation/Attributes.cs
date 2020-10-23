using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using react_poc.Models;

namespace react_poc.Validation
{
    public class ValidEmployeeName : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var ee = (Employee)validationContext.ObjectInstance;

            if (string.IsNullOrEmpty(ee.Name))
                return new ValidationResult("Name is required");

            if (ee.Name.Equals("error", StringComparison.InvariantCultureIgnoreCase))
                return new ValidationResult("Name cannot be \"error\"");

            return ValidationResult.Success;
        }
    }

    public class ValidFeeName : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var fee = (Fee)validationContext.ObjectInstance;

            if (string.IsNullOrEmpty(fee.Name))
                return new ValidationResult("Name is required");

            if (fee.Name.Equals("error", StringComparison.InvariantCultureIgnoreCase))
                return new ValidationResult("Name cannot be \"error\"");

            return ValidationResult.Success;
        }
    }

    public class ValidSSN : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var ee = (Employee)validationContext.ObjectInstance;

            if (string.IsNullOrEmpty(ee.SSN))
                return new ValidationResult("SSN is required");

            if (ee.SSN.Length != 9)
                return new ValidationResult("SSN must be 9 digits");

            if (ee.SSN.All(c => c == '1'))
                return new ValidationResult("SSN cannot be 111-11-1111");

            return ValidationResult.Success;
        }
    }

    public class ValidFeeType : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var fee = (Fee)validationContext.ObjectInstance;

            if (fee.FeeType == FeeType.Invalid)
                return new ValidationResult("Fee Type cannot be invalid");

            return ValidationResult.Success;
        }
    }

    public class ValidTriggerType : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var fee = (Fee)validationContext.ObjectInstance;

            if (fee.TriggerType == TriggerType.Invalid)
                return new ValidationResult("Trigger Type cannot be invalid");

            return ValidationResult.Success;
        }
    }
}
