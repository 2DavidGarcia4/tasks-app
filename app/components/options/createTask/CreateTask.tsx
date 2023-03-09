'use client'

import '../../../../styles/forms.css'
import styles from './createTask.module.css'
import { BiX, BiTask } from 'react-icons/bi'
import { useRef, FormEvent, KeyboardEvent } from 'react'
import { useNotifications, useTasks } from 'app/context/contexts'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function CreateTask(){
  const containerRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { tasks, setTasks } = useTasks()
  const { createNotification } = useNotifications()
  
  const close = () => {
    containerRef.current?.classList.remove(styles.show)
  }

  const submint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { currentTarget } = event
    const title = currentTarget.tatitle.value
    const description = currentTarget.description.value

    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${token}`
      },
      body: JSON.stringify({
        title,
        description
      })
    }).then(prom=> prom.json()).then(res=> {
      if(res.title){
        setTasks([res, ...tasks])
        createNotification({
          type: 'success',
          content: 'Task created'
        })
      }
    }).catch(()=> {
      console.error('Error in create task')
      createNotification({
        type: 'error',
        content: 'Error creating task'
      })
    })

    if(textAreaRef.current) textAreaRef.current.style.height = `40px`
    currentTarget.tatitle.value = ''
    currentTarget.description.value = ''
    close()
  }

  const hendleKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if(textAreaRef.current) {
      const textAreaStyle = textAreaRef.current.style
      textAreaStyle.height = `40px`
      const scHeight = event.currentTarget.scrollHeight, newHeight = `${scHeight}px`
      // console.log(textAreaStyle.height, newHeight)
      if(textAreaStyle.height != newHeight){
        textAreaStyle.height = newHeight
      }
    }
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <form onSubmit={submint} className={'form '+styles.form}>
        <BiX className={'icon'} onClick={close} />
        <h3 className={'title'} ><BiTask /> Create a task</h3>

        <div className='options'>
          <div className='option'>
            <label className='label' htmlFor="tatitle" >Title</label>
            <input className='input' id='tatitle' type="text" name='title' placeholder='Title of task' required={true} minLength={3} maxLength={150} />
          </div>
          
          <div className='option'>
            <label className='label' htmlFor="description" >Description</label>
            <textarea ref={textAreaRef} onKeyUp={hendleKeyUp} className='textarea' id='description' name='description' placeholder='Description of task' required={true} minLength={10} maxLength={600} />
          </div>
        </div>

        <button className='button' >Create</button>
      </form>
    </div>
  )
}