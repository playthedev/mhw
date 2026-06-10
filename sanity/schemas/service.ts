export default {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (R: any) => R.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "icon", title: "Icon Name (lucide)", type: "string" },
    { name: "category", title: "Category", type: "string", options: { list: ["accounting", "compliance", "ngo", "tax", "training", "audit"] } },
    { name: "features", title: "Features", type: "array", of: [{ type: "string" }] },
    { name: "order", title: "Display Order", type: "number" },
  ],
}
