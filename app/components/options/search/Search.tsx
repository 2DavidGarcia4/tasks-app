'use client'

import styles from './search.module.css'

import { BiX } from 'react-icons/bi'
import { useRef, ChangeEvent, useEffect, useState, FormEvent } from 'react'
import { Task } from 'app/types'
import { levenshtainDistance } from 'app/utils/functions'
import { useTasks } from 'app/context/contexts'

export default function Search(){
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionListRef = useRef<HTMLUListElement>(null)
  const { setTasks } = useTasks()
  const [allTasks, setAllTasks] = useState<Task[]>([])
  const [suggestions, setSuggestions] = useState<{ 
    id: string
    title: string
    start: string
    body: string
    end: string
  }[]>([])

  useEffect(()=> {
    let token: string | null = ''
    if(typeof localStorage != 'undefined') token = localStorage.getItem('token')
    fetch('/api/tasks', {
      headers: {
        'Authorization': `JWT ${token}`
      }
    }).then(prom=> prom.json()).then(res=> {
      setAllTasks(res)
    }).catch(()=> console.error('Error in search'))
  }, [])
  
  const closeSearch = () => {
    const element = searchRef.current
    if(element && element.classList.contains(styles.open)) {
      element.classList.remove(styles.open)
      if(inputRef.current) inputRef.current.value = ''
    }
    suggestionListRef.current?.classList.remove(styles['show-suggestions'])
    setSuggestions([])
  }  

  const tipingInput = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if(value.trim()){
      suggestionListRef.current?.classList.add(styles['show-suggestions'])
    }else{
      suggestionListRef.current?.classList.remove(styles['show-suggestions'])
    }

    const filter = allTasks.filter(f=> f.title.toLowerCase().includes(value.toLowerCase())).map(({id, title})=> ({id, title, distance: levenshtainDistance(value, title)}))
    const dataSugs = filter.sort((a, b)=> a.distance - b.distance).map(({id, title})=> {
      const lowerValue = value.toLowerCase(), lowerTitle = title.toLowerCase()
      const firts = lowerTitle.indexOf(lowerValue), last = firts+lowerValue.length

      const start = title.slice(0, firts)
      const body = title.slice(firts, last)
      const end = title.slice(last, lowerTitle.length)

      return {id, title, start, body, end}
    })
    setSuggestions(dataSugs)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    setTasks(allTasks.filter(m=> suggestions.some(s=> s.id == m.id)))
    closeSearch()
    setSuggestions([])
  }

  return (
    <div ref={searchRef} className={styles.search}>
      <form onSubmit={handleSubmit} className={styles.form} action="" >
        <input onChange={tipingInput} ref={inputRef} id='search-input' className={styles.input} type="text" placeholder='Search a task' autoComplete='off' />
        <BiX onClick={closeSearch} className={styles.icon} />
      </form>

      <ul ref={suggestionListRef} className={styles.suggestions}>
        {suggestions.map((s)=> {
            const click = () => {
              const clickedTask = allTasks.find(f=> f.id == s.id)
              if(clickedTask) setTasks([clickedTask])
              closeSearch()
              setSuggestions([])
            }

            return (
              <li key={s.id} onClick={click} className={styles.suggestion}>
                <p className={styles['suggestion-text']}>{s.start}<span className={styles['suggestion-body']} >{s.body}</span>{s.end}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}