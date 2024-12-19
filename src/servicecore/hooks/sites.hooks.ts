import api from "@flatfile/api";
import { bulkRecordHook, FlatfileRecord } from "@flatfile/plugin-record-hook";

export const sitesCustomerNameCompletion = bulkRecordHook("sites", async (records: FlatfileRecord[], event) => {
  console.log("Processing", records.length, "record(s)");
  // Get a list of all sheets in the workbook
  const { data: sheets } = await api.sheets.list({ workbookId: event.context.workbookId });

  // And get the sheet ID for the customer sheet
  const customerSheet = sheets.find(s => s.config.slug === "customer_info");

  // Get all customer records
  const { data: customerRecords }  = await api.records.get(customerSheet.id);
  for (const record of records) {

    // Look up customer name if we have a valid customer ID
    const customerId = record.get("customerId");
    if (customerId) {
      try {
        // Get the customer sheet ID from the workbook
        if (customerSheet) {
          // Find the matching customer record
          const customerRecord = customerRecords.records.find(r => r.values.id?.value === customerId);

          if (customerRecord) {
            const name = customerRecord.values.customerName?.value;
            const company = customerRecord.values.company?.value;

            // Build the customer name
            let customerName;
            if (name) {
              customerName = name;
            }
            if (company) {
              customerName = customerName ? customerName + ", " + company : company;
            }          

            // Set the customer name
            if (customerName) {
              record.set("customerName", String(customerName));
            } else {
              record.addWarning("customerName", "Customer found but name is missing");
            }
          } else {
            record.addError("customerId", "Customer ID not found");
          }
        } else {
          record.addError("customerId", "Customer sheet not found");
        }
      } catch (error) {
        console.error("Error looking up customer:", error);
        record.addError("customerName", "Failed to look up customer name");
      }
    }
  }

}); 