export interface FormValidationRule {
  field: string;
  regex?: RegExp;
  required: boolean;
}
