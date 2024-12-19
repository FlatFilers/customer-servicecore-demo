import { FlatfileListener } from "@flatfile/listener";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { ServiceCore } from "./servicecore";
import { instrumentRequests } from "./support/instrument.requests";

instrumentRequests();

export default function (listener: FlatfileListener) {
  // Globally installed plugins
  listener.use(ExcelExtractor());

  // Customer specific demo app
  listener.use(ServiceCore)
}