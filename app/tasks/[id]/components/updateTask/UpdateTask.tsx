// 'use client'

import '../../../../../styles/forms.css'
import styles from './update.module.css'

import { Dispatch, FormEvent, SetStateAction } from 'react'
import { Task } from "app/types";
import { BiX, BiLoader } from 'react-icons/bi'

export default function UpdateTask({task, setTask, toggle, token}: {task: Task | undefined, setTask: Dispatch<SetStateAction<Task | undefined>>, toggle: ()=> void, token: string | null}) {
  
  const close = () => {
    toggle()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = event.currentTarget.tatitle.value
    const description = event.currentTarget.description.value
    const notificationAt = event.currentTarget.notificationAt.value || null

    fetch(`/api/tasks/${task?.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        notificationAt
      })
    }).then(prom=> prom.json()).then(res=> {
      if(res.length){
        fetch(`/api/tasks/${task?.id}`, {
          headers: {
            'Authorization': `JWT ${token}`
          }
        }).then(prom=> prom.json()).then(rest=>{
          setTask(rest)
        }).catch(()=> console.error('Error in get task after update'))
      }
      close()
    }).catch(()=> console.error('Error in update task'))
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={`${styles.form} form form-page`}>
        <BiX onClick={close} className={styles.close} />

        <div className={styles.inputs}>
          <div>
            <label className='label' htmlFor="tatitle" >Email</label>
            <input className='input' id='tatitle' type="text" defaultValue={`${task?.title}`} name='tatitle' required={true} minLength={3} maxLength={150} />
          </div>
          <div>
            <label className='label' htmlFor="description" >Description</label>
            <input className='input' id='description' type="text" defaultValue={`${task?.description}`} name='description' required={true} minLength={4} maxLength={30} />
          </div>
          <div>
            <label className='label' htmlFor="notificationAt" >Notification at</label>
            <input className='input' id='notificationAt' type="date" defaultValue={task?.notificationAt || undefined} name='notificationAt' />
          </div>
        </div>

        <button className='button' ><BiLoader /> Update</button>

      </form>
    </div>
  )
}