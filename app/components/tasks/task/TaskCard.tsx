'use client'

import styles from './taskCard.module.css'

import { Task } from 'app/types'
import { useRef, useState, ChangeEvent } from 'react'
import { BiCheck, BiTime } from 'react-icons/bi'
import Link from 'next/link'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function TaskCard({task}: {task: Task}){
  const taskRef = useRef<HTMLLIElement>(null)

  const [color, setColor] = useState<undefined | string>(task.isCompleted ? '#B5F1CC' : undefined)

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
    })
    .catch(()=> '')

    task.isCompleted = checked
    if(checked) {
      setColor('#B5F1CC')
    }else {
      setColor(undefined)
    }
  }

  return (
    <li className={styles.task} style={{backgroundColor: color}} draggable={true} >
      <div>
        <Link href={`/tasks/${task.id}`}>
          <h3 className={styles.title}>{task.isCompleted ? <BiCheck className={`${styles.icon} ${styles.check}`} /> : <BiTime className={styles.icon} />} {task.title}</h3>
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