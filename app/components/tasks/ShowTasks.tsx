'use client'

import styles from './showTasks.module.css'

import { useEffect } from 'react'
import TaskCard from "./task/TaskCard"
import { Task } from 'app/types'
import { useTasks } from 'app/context/contexts'

export default function ShowTasks(){
  const { tasks, setTasks } = useTasks()

  useEffect(()=> {
    let token: string | null = ''
    if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

    if(token){
      fetch('/api/tasks', {
        headers: {
          'Authorization': `JWT ${token}`
        }
      }).then(prom => prom.json()).then((res: Task[])=> {
        setTasks(res.sort((a, b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      })
      .catch()
    }
  }, [setTasks])

  return (
    <div className={styles.tasks}>
      <h2 className={styles.title}>{tasks.length > 0 ? `Tasks: ${tasks.length}` : 'No tasks'}</h2>
      <ul className={styles.list}>
        {tasks.map(t=> <TaskCard key={t.id} task={t} />)}
      </ul>
    </div>
  )
}