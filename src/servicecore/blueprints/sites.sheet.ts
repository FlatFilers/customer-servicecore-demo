import { Flatfile } from "@flatfile/api";
import { StringValidationType, ValidationType } from "../../support/utils/common/validation";

/**
 * @FlatfileConstraints
 */
export const sitesSheet: Flatfile.SheetConfig = {
  name: "Sites",
  slug: "sites",
  readonly: false,
  allowAdditionalFields: false,
  fields: [
    {
      key: "id",
      type: "string",
      label: "Site ID",
      description: "Unique identifier for the site",
      constraints: [
        { type: "required" },
        { type: "unique" }
      ],
    },
    {
      key: "customerId",
      type: "reference",
      label: "External ID",
      description: "Reference to customer's External ID",
      config: {
        ref: "customer_info",
        key: "id",
        relationship: "has-one"
      },
      constraints: [
        { type: "required" }
      ],
    },
    {
      key: "customerName",
      type: "string",
      label: "Customer Name",
      description: "Name of the referenced customer (computed)",
      readonly: true,
      constraints: [
        { type: "computed" }
      ],
    },
    {
      key: "name",
      type: "string",
      label: "Site Name",
      description: "Name of the site",
      constraints: [
        { type: "required" },
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.LENGTH,
          min: 2,
          max: 255,
          options: { 
            addError: true
          }
        }}
      ],
    },
    {
      key: "address",
      type: "string",
      label: "Address",
      description: "Site address",
      constraints: [
        { type: "required" },
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.LENGTH,
          min: 2,
          max: 255,
          options: { 
            addError: true
          }
        }}
      ],
    },
    {
      key: "city",
      type: "string",
      label: "City",
      description: "Site city",
      constraints: [
        { type: "required" },
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.LENGTH,
          min: 2,
          max: 255,
          options: { 
            addError: true
          }
        }}
      ],
    },
    {
      key: "state",
      type: "string",
      label: "State",
      description: "Site state",
      constraints: [
        { type: "required" },
        { type: "external", validator: "StringValidator", config: { 
          type: ValidationType.LENGTH,
          min: 2,
          max: 255,
          options: { 
            addError: true
          }
        }}
      ],
    },
    {
      key: "zipCode",
      type: "string",
      label: "ZIP Code",
      description: "Site ZIP code",
      constraints: [
        { type: "required" },
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
      description: "Additional notes about the site",
    }
  ],
}; 