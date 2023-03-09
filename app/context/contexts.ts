import { Notification, Task, User, ConfigCreateNotifi } from 'app/types';
import { createContext, useContext, Dispatch, SetStateAction } from 'react';

interface UserContext {
  user: User | undefined, setUser: Dispatch<SetStateAction<User | undefined>>
}

interface TasksContext {
  tasks: Task[], setTasks: Dispatch<SetStateAction<Task[]>>
}

interface NotificationsContext {
  notifications: Notification[]
  createNotification: (config: ConfigCreateNotifi)=> void,
  deleteNotification: (noti: Notification)=> void
}

export const UserContext = createContext<UserContext | null>(null);
export const TasksContext = createContext<TasksContext | null>(null);
export const NotificationsContext = createContext<NotificationsContext | null>(null);

export const useUser = () => {
  const context = useContext(UserContext) as UserContext
  return context
}

export const useTasks = () => {
  const context = useContext(TasksContext) as TasksContext
  return context
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext) as NotificationsContext
  return context
}