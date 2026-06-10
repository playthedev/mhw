import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export const dynamic = "force-dynamic"

// Returns real enrollment counts per courseId
export async function GET() {
  try {
    const db = await getDb()
    const agg = await db
      .collection("enrollments")
      .aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: "$courseId", count: { $sum: 1 } } },
      ])
      .toArray()

    const stats: Record<string, number> = {}
    for (const row of agg) {
      if (row._id) stats[row._id as string] = row.count
    }

    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({})
  }
}
