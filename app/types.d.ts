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

export interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  time: number
  content: string
}

export interface ConfigCreateNotifi {
  type: Notification['type']
  time?: number
  content: string
}