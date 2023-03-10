'use client'

import styles from './task.module.css'

import { useState, useEffect } from 'react'
import { Task } from 'app/types'
import { BiPen, BiTrash, BiStats } from 'react-icons/bi'
import Confirmation from './components/messages/Confirmation'
import { useRouter } from 'next/navigation'
import UpdateTask from './components/updateTask/UpdateTask'
import Loader from 'app/components/shared/loading/Loader'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function ShowTask({params}: {params: {id: string}}){
  const { id } = params
  const route = useRouter()
  const [task, setTask] = useState<Task | undefined>(undefined)
  const [confirmation, setConfirmation] = useState(false)
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    fetch(`/api/tasks/${id}`, {
      headers: {
        'Authorization': `JWT ${token}`
      }
    }).then(prom=> prom.json()).then(res=> {
      setTask(res)
      setLoading(false)
    }).catch(()=> console.error('Error in task page'))
  }, [id])

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
        {loading ? <Loader /> :
          (
            <>
              <i className={styles.status} ><BiStats />  {task?.isCompleted ? `Completed task at ${new Date(task?.completedAt || '').toLocaleString()}` : `Incomplete task`}</i>
              <div className={styles.option}>
                <p className={styles.title}>Title:</p>
                <h2 className={styles.content}>{task?.title}</h2>
              </div>
              <div className={styles.option}>
                <p className={styles.title}>Description:</p>
                <p className={styles.content}>{task?.description}</p>
              </div>

              <div className={styles.dates}>
                <div className={styles['date-option']}>
                  <p className={styles.title}>Created at:</p>
                  <p className={styles.content}>{`${new Date(task?.createdAt || '').toLocaleString()}`}</p>
                </div>
                {
                  task?.notificationAt && (
                    <div className={styles['date-option']}>
                      <p className={styles.title}>Notification at:</p>
                      <p className={styles.content}>{`${new Date(task?.notificationAt || '').toLocaleString()}`}</p>
                    </div>
                  )
                }
              </div>

              <div className={styles.buttons}>
                <button onClick={updateTask} className={styles.update}><BiPen className={styles.icon} />  Update</button>
                <button onClick={deleteTask} className={styles.delete}><BiTrash className={styles.icon} /> Delete</button>
              </div>
            </>
          )
        }
        
      </div>
    </section>
  )
}