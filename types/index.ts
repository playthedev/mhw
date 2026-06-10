export interface Course {
  id: string
  title: string
  slug: string
  description: string
  price: number
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  thumbnail: string
  videoUrl: string
  syllabus: string[]
  instructor: string
  enrolledCount: number
  rating: number
  featured: boolean
  createdAt: string
}

export interface Service {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
  category: "accounting" | "compliance" | "ngo" | "training"
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  author: string
  category: string
  publishedAt: string
  readTime: number
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  courseName: string
  amount: number
  status: "pending" | "active" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  stripeSessionId: string
  createdAt: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  email?: string
}
