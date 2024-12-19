import FlatfileListener from "@flatfile/listener";
import { addStringValidator } from "../support/utils/common/validation";
import { customerDeliveryMethodValidation } from "./hooks/customers.hooks";
import { sitesCustomerNameCompletion } from "./hooks/sites.hooks";
import { spaceConfigure } from "./space.configure";
import { submitActionHandler } from "./jobs/submit.job";

export function ServiceCore(listener: FlatfileListener) {
  // Add sheet validators
  listener.use(customerDeliveryMethodValidation);
  listener.use(sitesCustomerNameCompletion);

  // Add external validation
  listener.use(addStringValidator);

  // Add job handlers
  listener.use(submitActionHandler);

  // Configure the space
  listener.use(spaceConfigure);
} 