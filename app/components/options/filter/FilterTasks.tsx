'use client'

import styles from './filterTasks.module.css'

import { useRef, MouseEvent } from 'react'
import { BiX } from 'react-icons/bi'
import { Task } from 'app/types'
import { useTasks } from 'app/context/contexts'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function FilterTasks(){
  const filterRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLUListElement>(null)
  const { setTasks } = useTasks()
  
  const close = () => {
    filterRef.current?.classList.remove(styles.show)
  }

  const selectOptionFilter = ({currentTarget}: MouseEvent<HTMLLIElement>) => {
    if(typeof document != 'undefined'){
      const options = document.querySelectorAll('.'+styles.option)
      if(options && !currentTarget.classList.contains(styles.selected)){
        const { id: type } = currentTarget
        fetch('/api/tasks', {
          headers: {
            'Authorization': `JWT ${token}`
          }
        }).then(prom=> prom.json()).then((res: Task[])=> {
          if(type == 'all'){
            setTasks(res.sort((a, b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
          }else{
            const filter = res.filter(f=> (type == 'completed' ? f.isCompleted : !f.isCompleted))
            setTasks(filter.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
          }
        }).catch(()=> console.error('Error in filter'))

        options.forEach((f)=> {
          if(type == f.id){
            f.classList.add(styles.selected)
          }else{
            f.classList.remove(styles.selected)
          }
        })

      }
    }
  }

  return (  
    <div ref={filterRef} className={styles.filter} >
      <BiX className={styles.icon} onClick={close} />
      <h3 className={styles.title}>Filter tasks</h3>
      <ul ref={optionsRef} className={styles.options} >
        <li id='all' className={`${styles.option} ${styles.selected}`} onClick={selectOptionFilter} >
          <p>All</p>
        </li>
        <li id='completed' className={styles.option} onClick={selectOptionFilter} >
          <p>Completed</p>
        </li>
        <li id='incomplete' className={styles.option} onClick={selectOptionFilter} >
          <p>Incomplete</p>
        </li>
      </ul>
    </div>
  )
}