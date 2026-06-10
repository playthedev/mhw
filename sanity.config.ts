import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  name: "proconsult",
  title: "ProConsult CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Courses")
              .child(S.documentTypeList("course").title("Courses")),
            S.listItem()
              .title("Services")
              .child(S.documentTypeList("service").title("Services")),
            S.listItem()
              .title("Study Articles")
              .child(S.documentTypeList("article").title("Articles")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
