'use client'

import styles from './showTasks.module.css'

import { useEffect, useState } from 'react'
import TaskCard from "./task/TaskCard"
import { Task } from 'app/types'
import { useNotifications, useTasks } from 'app/context/contexts'
import Loader from '../shared/loading/Loader'

export default function ShowTasks(){
  const [loading, setLoading] = useState(true)
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
        setLoading(false)
        if(res.length){
          setTasks(res.sort((a, b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        }
      })
      .catch(()=> {
        console.error('Error no login')
      })
    }
  }, [])

  return (
    <div className={styles.tasks}>
      {
        loading ? <Loader /> :
        (
          <>
            <h2 className={styles.title}>{tasks.length > 0 ? `Tasks: ${tasks.length}` : 'No tasks'}</h2>
            <ul className={styles.list}>
              {tasks.map(t=> <TaskCard key={t.id} task={t} />)}
            </ul>
          </>
        )
      }
    </div>
  )
}