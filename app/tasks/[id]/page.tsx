'use client'

import styles from './task.module.css'

import { useState, useEffect } from 'react'
import { Task } from 'app/types'
import { BiPen, BiTrash } from 'react-icons/bi'
import Confirmation from './components/messages/Confirmation'
import { useRouter } from 'next/navigation'
import UpdateTask from './components/updateTask/UpdateTask'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function ShowTask({params}: {params: {id: string}}){
  const { id } = params
  const route = useRouter()
  const [task, setTask] = useState<Task | undefined>(undefined)
  const [confirmation, setConfirmation] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(()=> {
    fetch(`/api/tasks/${id}`, {
      headers: {
        'Authorization': `JWT ${token}`
      }
    }).then(prom=> prom.json()).then(res=> {
      setTask(res)
      // setTitle(res.title)
    }).catch(()=> console.error('Error in task page'))
  }, [])

  const updateTask = () => {
    setUpdate(!update)
  }

  const deleteTask = () => {
    setConfirmation(!confirmation)
  }

  return (
    <section className={styles.task} >
      {confirmation && <Confirmation taskData={{id: task?.id, title: task?.title}} toggle={deleteTask} redireact={()=> route.push('/')} />}
      {update && <UpdateTask task={task} setTask={setTask} toggle={updateTask} token={token} />}

      <div className={styles.details}>
        <p className={styles.status} >{task?.isCompleted ? `Completed task at ${new Date(task?.completedAt || '').toLocaleString()}` : `Incomplete task`}</p>
        <div>
          <h4 className={styles.title}>Title:</h4>
          <p className={styles.content}>{task?.title}</p>
        </div>
        <div>
          <h4 className={styles.title}>Description:</h4>
          <p className={styles.content}>{task?.description}</p>
        </div>
        <div>
          <h4 className={styles.title}>Created at:</h4>
          <p className={styles.content}>{`${new Date(task?.createdAt || '').toLocaleString()}`}</p>
        </div>
        {
          task?.notificationAt && (
            <div>
              <h4 className={styles.title}>Notification at:</h4>
              <p className={styles.content}>{`${new Date(task?.notificationAt || '').toLocaleString()}`}</p>
            </div>
          )
        }

        <div className={styles.buttons}>
          <button onClick={updateTask} className={styles.update}><BiPen />  Update</button>
          <button onClick={deleteTask} className={styles.delete}><BiTrash /> Delete</button>
        </div>
        
      </div>
    </section>
  )
}