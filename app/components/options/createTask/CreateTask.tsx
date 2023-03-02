'use client'

import '../../../../styles/forms.css'
import styles from './createTask.module.css'
import { BiX, BiTask } from 'react-icons/bi'
import { useRef, FormEvent } from 'react'
import { useTasks } from 'app/context/contexts'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function CreateTask(){
  const containerRef = useRef<HTMLDivElement>(null)
  const { tasks, setTasks } = useTasks()
  
  const close = () => {
    containerRef.current?.classList.remove(styles.show)
  }

  const submint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetch('/api/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${token}`
      },
      body: JSON.stringify({
        title: event.currentTarget.tatitle.value,
        description: event.currentTarget.description.value
      })
    }).then(prom=> prom.json()).then(res=> {
      if(res.title){
        setTasks([res, ...tasks])
      }
    }).catch(()=> console.error('Error in create task'))
    
    close()
    event.currentTarget.tatitle.value = ''
    event.currentTarget.description.value = ''
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <form onSubmit={submint} className={'form '+styles.form}>
        <BiX className={'icon'} onClick={close} />
        <h3 className={'title'} ><BiTask /> Create a task</h3>
        <div>
          <label className={'label'} htmlFor="title" >Title</label>
          <input className={'input'} id='tatitle' type="text" placeholder='Write your title' name='title' required={true} minLength={3} maxLength={150} />
        </div>
        <div>
          <label className={'label'} htmlFor="desciption" >Desciption</label>
          <textarea className={'textarea'} id='description' placeholder='Write your desciption' name='desciption' rows={4} required={true} minLength={10} maxLength={200} />
        </div>
        <button className={'button'} >Create</button>
      </form>
    </div>
  )
}