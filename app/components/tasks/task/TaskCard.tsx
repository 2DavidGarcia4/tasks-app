'use client'

import styles from './taskCard.module.css'

import { Task } from 'app/types'
import Link from 'next/link'
import { useRef, useState, ChangeEvent, useEffect, DragEvent, TouchEvent } from 'react'
import { BiCheck, BiTime } from 'react-icons/bi'
import { useNotifications } from 'app/context/contexts'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function TaskCard({task}: {task: Task}){
  const taskRef = useRef<HTMLLIElement>(null)
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)
  const { createNotification } = useNotifications()

  useEffect(()=> {
    if(task.notificationAt && !task.isCompleted){
      const nowTime = Date.now()
      const notificationTime = new Date(task.notificationAt).getTime()
      
      if(notificationTime > nowTime){
        const timeDifference = Math.floor(notificationTime-nowTime)
        if(timeDifference <= (8*60*60000)){
          setTimeout(()=> {
            if(typeof document != 'undefined'){
              document.title = 'Reminder of your task'
              setTimeout(()=> {
                document.title = 'Tasks app'
              }, 50000)
            }
            createNotification({
              type: 'info',
              content: `Reminder of your task (${task.title})`,
              time: (2*60000)
            })
          }, timeDifference)
        }
      }
    }
  }, [])

  const checking = ({target: {checked}}: ChangeEvent<HTMLInputElement>) => {
    fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${token}`
      },
      body: JSON.stringify({
        isCompleted: checked
      })
    }).then(()=> {
      console.log(isCompleted)
      if(isCompleted){
        createNotification({
          type: 'warning',
          content: 'Task marked as not finished'
        })
      }else{
        createNotification({
          type: 'success',
          content: 'Task marked as finished'
        })
      }
      setIsCompleted(!isCompleted)
    })
    .catch(()=> {
      console.error('Error in update task from task component.')
      createNotification({
        type: 'error',
        content: 'Error marking a task'
      })
    })
    

    task.isCompleted = checked
    taskRef.current?.classList.toggle(`${styles.completed}`)
  }

  return (
    <li ref={taskRef} className={`${styles.task} ${task.isCompleted && styles.completed}`} >
      <div>
        <Link href={`/tasks/${task.id}`}>
          <h3 className={styles.title}>{isCompleted ? <BiCheck className={`${styles.icon} ${styles.check}`} /> : <BiTime className={styles.icon} />} {task.title}</h3>
        </Link>
        <p className={styles.description}>{task.description}</p>
      </div>

      <div>
        <div className={styles.checkbox}>
          <input onChange={checking} type="checkbox" defaultChecked={task.isCompleted} />
        </div>
      </div>
    </li>
  )
}