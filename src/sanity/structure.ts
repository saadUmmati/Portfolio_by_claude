import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.listItem()
        .title("Homepage Stats")
        .child(
          S.editor()
            .id("siteStats")
            .schemaType("siteStats")
            .documentId("siteStats") // fixed ID -- there's only ever one of these
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "siteStats" && item.getId() !== "siteSettings"
      ),
    ]);
