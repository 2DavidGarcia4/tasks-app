import '../../../../../styles/forms.css'
import styles from './update.module.css'

import { Dispatch, FormEvent, SetStateAction, useRef, KeyboardEvent } from 'react'
import { Task } from "app/types";
import { BiX, BiLoader } from 'react-icons/bi'
import { useNotifications } from 'app/context/contexts';

export default function UpdateTask({task, setTask, toggle, token}: {task: Task | undefined, setTask: Dispatch<SetStateAction<Task | undefined>>, toggle: ()=> void, token: string | null}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { createNotification } = useNotifications()

  const notDate = task?.notificationAt && new Date(task.notificationAt)
  const defaultNotAt = notDate && new Date(notDate.getTime() - notDate.getTimezoneOffset() * 60000).toISOString().slice(0,16)

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
      if(res.title){
        setTask(res)
        createNotification({
          type: 'success',
          content: 'Updating task'
        })
      }
      toggle()
    }).catch(()=> {
      console.error('Error in update task')
      createNotification({
        type: 'error',
        content: 'Error updating task'
      })
    })
  }

  const hendleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if(textAreaRef.current) {
      const textAreaStyle = textAreaRef.current.style
      textAreaStyle.height = `40px`
      const scHeight = event.currentTarget.scrollHeight, newHeight = `${scHeight}px`
      if(textAreaStyle.height != newHeight){
        textAreaStyle.height = newHeight
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={`${styles.form} form form-page`}>
        <BiX onClick={toggle} className='icon' />

        <div className='options'>
          <div className='option'>
            <label className='label' htmlFor="tatitle" >Email</label>
            <input className='input' id='tatitle' type="text" defaultValue={`${task?.title}`} name='tatitle' required={true} minLength={3} maxLength={150} />
          </div>
          <div className='option'>
            <label className='label' htmlFor="description" >Description</label>
            <textarea ref={textAreaRef} onKeyUp={hendleKeyUp} className='textarea' id='description' defaultValue={`${task?.description}`} name='description' required={true} minLength={10} maxLength={600} />
          </div>
          <div className='option'>
            <label className='label' htmlFor="notificationAt" >Notification at</label>
            <input className='input' id='notificationAt' type="datetime-local" defaultValue={defaultNotAt || undefined} name='notificationAt' />
          </div>
        </div>

        <button className='button' ><BiLoader /> Update</button>

      </form>
    </div>
  )
}