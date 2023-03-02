export type Task = {
  id: string
  title: string
  description: string
  createdAt: string
  notificationAt: string | null
  completedAt: string | null
  isCompleted: boolean
}

export type User = {
  id: string
  name: string
  email: string
  password: string
  imageUrl: string | null
}