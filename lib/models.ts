import { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  passwordHash: string
  role: "user" | "admin"
  emailVerified: boolean
  emailVerifyToken?: string
  emailVerifyExpires?: Date
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Enrollment {
  _id?: ObjectId
  courseId: string
  courseName: string
  amount: number
  status: "active" | "pending" | "completed" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed" | "refunded"
  stripeSessionId: string
  customerEmail: string
  customerName: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactSubmission {
  _id?: ObjectId
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: Date
}
