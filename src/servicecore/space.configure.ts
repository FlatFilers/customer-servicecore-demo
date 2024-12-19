import { configureSpace } from "@flatfile/plugin-space-configure";
import { customersSheet } from "./blueprints/customers.sheet";
import { sitesSheet } from "./blueprints/sites.sheet";

export const spaceConfigure = configureSpace({
  workbooks: [
    {
      name: "ServiceCore Customer Information",
      sheets: [customersSheet, sitesSheet],
      actions: [
        {
          operation: "submitActionFg",
          mode: "foreground",
          label: "Submit",
          primary: true,
          description: "Submit customer information for processing",
        },
      ],
    },
  ],
  space: {
    metadata: {
      theme: {
        root: {
          primaryColor: "#f78d11",
        },
        sidebar: {
          logo: "https://servicecore.com/wp-content/uploads/2023/12/ServiceCore-Logo-Header.webp",
          backgroundColor: "#ffffff",
          focusTextColor: "#ffffff",
          focusBgColor: "#f78d11",
          titleColor: "#f78d11",
          textColor: "#000000"
        },
      },
    },
  },
})