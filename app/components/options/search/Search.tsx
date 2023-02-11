'use client'

import styles from './search.module.css'

import { BiX } from 'react-icons/bi'
import { useRef, ChangeEvent } from 'react'

export default function Search(){
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionListRef = useRef<HTMLUListElement>(null)
  
  const closeSearch = () => {
    const element = searchRef.current
    if(element && element.classList.contains(styles.open)) {
      element.classList.remove(styles.open)
      if(inputRef.current) inputRef.current.value = ''
    }
  }  

  const tipingInput = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if(value){
      suggestionListRef.current?.classList.add(styles['show-suggestions'])
    }else{
      suggestionListRef.current?.classList.remove(styles['show-suggestions'])
    }
  }

  return (
    <div ref={searchRef} className={styles.search}>
      <form onSubmit={(e)=> e.preventDefault()} className={styles.form} action="" >
        <input onChange={tipingInput} ref={inputRef} id='search-input' className={styles.input} type="text" placeholder='Search a task' />
        <BiX onClick={closeSearch} className={styles.icon} />
      </form>

      <ul ref={suggestionListRef} className={styles.suggestions}>
        <li className={styles.suggestion}>
          <p className={styles['suggestion-text']}>Hola</p>
        </li>
        <li className={styles.suggestion}>
          <p className={styles['suggestion-text']}>Jaja</p>
        </li>
      </ul>
    </div>
  )
}