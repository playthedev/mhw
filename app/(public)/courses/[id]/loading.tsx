import { Loader2 } from "lucide-react"

export default function CourseDetailLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-7 h-7 text-primary-400 animate-spin" />
    </div>
  )
}
