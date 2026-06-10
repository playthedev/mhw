export default {
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (R: any) => R.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R: any) => R.required() },
    { name: "description", title: "Description", type: "text" },
    { name: "price", title: "Price (PKR)", type: "number" },
    { name: "duration", title: "Duration", type: "string" },
    { name: "level", title: "Level", type: "string", options: { list: ["Beginner", "Intermediate", "Advanced"] } },
    { name: "category", title: "Category", type: "string" },
    { name: "thumbnail", title: "Thumbnail", type: "image", options: { hotspot: true } },
    { name: "videoUrl", title: "Video URL (Cloudflare Stream)", type: "url" },
    { name: "instructor", title: "Instructor", type: "string" },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
    {
      name: "syllabus", title: "Syllabus",
      type: "array", of: [{ type: "string" }],
    },
    { name: "stripePriceId", title: "Stripe Price ID", type: "string" },
  ],
}
