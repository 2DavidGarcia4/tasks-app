'use client'

import styles from './taskCard.module.css'

import { Task } from 'app/types'
import { useRef, useState, ChangeEvent } from 'react'
import { BiCheck, BiTime } from 'react-icons/bi'
import Link from 'next/link'
import { useNotifications } from 'app/context/contexts'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function TaskCard({task}: {task: Task}){
  const taskRef = useRef<HTMLLIElement>(null)
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)
  const { createNotification } = useNotifications()

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
    <li ref={taskRef} className={`${styles.task} ${task.isCompleted && styles.completed}`} draggable={true} >
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