import { Flatfile } from "@flatfile/api";
import { ValidationType, StringValidationType } from "../../support/utils/common/validation";

/**
 * @FlatfileConstraints
 */
export const customersSheet: Flatfile.SheetConfig = {
  name: "Customer Information",
  slug: "customer_info",
  readonly: false,
  allowAdditionalFields: false,
  fields: [
    {
      key: "id",
      type: "string",
      label: "External ID",
      description: "External system identifier",
      constraints: [
        { type: "required" },
        { type: "unique" },
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.VALIDATE,
          formatOptions: { trim: true },
          options: { setRecord: true }
        }}
      ],
    },
    {
      key: "customerName",
      type: "string",
      label: "Customer Name",
      description: "Full name of the customer",
      constraints: [
        { type: "required" },
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.VALIDATE,
          formatOptions: { case: "title" },
          options: { setRecord: true }
        }}
      ],
    },
    {
      key: "company",
      type: "string",
      label: "Company",
      description: "Company name if applicable",
      constraints: [
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.VALIDATE,
          formatOptions: { case: "title" },
          options: { setRecord: true }
        }}
      ],
    },
    {
      key: "billingAddress",
      type: "string",
      label: "Billing Address",
      description: "Primary billing address",
      constraints: [{ type: "required" }],
    },
    {
      key: "billingAddress2",
      type: "string",
      label: "Billing Address 2",
      description: "Secondary billing address line",
    },
    {
      key: "billingCity",
      type: "string",
      label: "Billing City",
      description: "City for billing address",
      constraints: [
        { type: "required" },
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.VALIDATE,
          formatOptions: { case: "title" },
          options: { setRecord: true }
        }}
      ],
    },
    {
      key: "billingState",
      type: "string",
      label: "Billing State",
      description: "State for billing address",
      constraints: [
        { type: "required" },
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.VALIDATE,
          formatOptions: { case: "upper" },
          options: { setRecord: true }
        }}
      ],
    },
    {
      key: "billingZip",
      type: "string",
      label: "Billing Zip",
      description: "ZIP/Postal code for billing address",
      constraints: [
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.PATTERN,
          pattern: "^\\d{5}(?:-\\d{4})?$",
          options: { 
            setRecord: true, 
            addError: true, 
            errorMsg: "ZIP code must be in format 12345 or 12345-1234"
          }
        }}
      ],
    },
    {
      key: "notes",
      type: "string",
      label: "Notes",
      description: "Additional notes or comments",
    },
    {
      key: "firstName",
      type: "string",
      label: "First Name",
      description: "Contact person's first name",
      constraints: [
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.VALIDATE,
          formatOptions: { case: "title" },
          options: { setRecord: true }
        }}
      ],
    },
    {
      key: "lastName",
      type: "string",
      label: "Last Name",
      description: "Contact person's last name",
      constraints: [
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.VALIDATE,
          formatOptions: { case: "title" },
          options: { setRecord: true }
        }}
      ],
    },
    {
      key: "phone",
      type: "string",
      label: "Phone",
      description: "Contact phone number",
      constraints: [
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.IS_PHONE,
          validationArgs: "us",
          formatOptions: { trim: true },
          options: { 
            setRecord: true, 
            addError: true, 
            errorMsg: "Phone must be in format 123-456-7890"
          }
        }}
      ],
    },
    {
      key: "phoneExt",
      type: "string",
      label: "Phone Ext",
      description: "Phone extension if applicable",
      constraints: [
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.PATTERN,
          pattern: "^\\d+$",
          options: { 
            setRecord: true, 
            addError: true, 
            errorMsg: "Phone extension must contain only digits"
          }
        }}
      ],
    },
    {
      key: "email",
      type: "string",
      label: "Email",
      description: "Contact email address",
      constraints: [
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.EVALUATE_AND_FORMAT,
          validationType: StringValidationType.IS_EMAIL,
          formatOptions: { trim: true, case: "lower" },
          options: { 
            setRecord: true, 
            addError: true, 
            errorMsg: "Must be a valid email address"
          }
        }}
      ],
    },
    {
      key: "invoiceDeliveryMethod",
      type: "enum",
      label: "Invoice Delivery Method",
      description: "Preferred method of invoice delivery",
      config: {
        options: [
          { value: "email", label: "Email" },
          { value: "print", label: "Print" },
        ],
      },
    },
  ],
}; 