import { recordHook } from "@flatfile/plugin-record-hook";
import { StringValidator, StringValidationType } from "../../support/utils/common/validation";

/* This code snippet is defining a function `customerDeliveryMethodValidation` using the `recordHook`
function from the `@flatfile/plugin-record-hook` library. */
export const customerDeliveryMethodValidation = recordHook("customer_info", async (record) => {
  const deliveryMethod = record.get("invoiceDeliveryMethod");
  const requireEmail = deliveryMethod === "email";
  const requireAddress = deliveryMethod === "print";

  // Check required fields based on delivery method
  if (requireEmail && !record.get("email")) {
    record.addError("email", "Email address is required for email delivery method");
  }

  // Check required fields based on delivery method
  if (requireAddress) {
    if (!record.get("billingAddress")) {
      record.addError("billingAddress", "Address is required for print delivery method");
    }
    if (!record.get("billingCity")) {
      record.addError("billingCity", "City is required for print delivery method");
    }
    if (!record.get("billingState")) {
      record.addError("billingState", "State is required for print delivery method");
    }
    if (!record.get("billingZip")) {
      record.addError("billingZip", "ZIP code is required for print delivery method");
    }
  }

  return record;
}); 