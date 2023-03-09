'use client'

import styles from './options.module.css'
import searchStyles from './search/search.module.css'
import createTaskStyles from './createTask/createTask.module.css'
import filterTasksStyles from './filter/filterTasks.module.css'

import { BiSearch } from 'react-icons/bi'
import { BiPlus } from 'react-icons/bi'
import { BiFilter } from 'react-icons/bi'
import { useLogin } from 'app/hooks/useLogin'
import { useRouter } from 'next/navigation'


export default function Options(){
  const router = useRouter()
  const isLoged = useLogin()

  const openAndCloseSearch = () => {
    if(!isLoged) return router.push('/user/login/')
      
    
    if(typeof document != 'undefined'){
      const search = document.querySelector('.'+searchStyles.search)
      search?.classList.toggle(searchStyles.open)
      const searchInput = document.getElementById('search-input')

      if(search?.classList.contains(searchStyles.open)) searchInput?.focus()
      else searchInput?.blur()
    }
  }

  const showForm = () => {
    if(!isLoged) return router.push('/user/login/')
    if(typeof document != 'undefined'){
      const createTask = document.querySelector('.'+createTaskStyles.container)
      createTask?.classList.add(createTaskStyles.show)
    }
  }

  const showFilter = () => {
    if(!isLoged) return router.push('/user/login/')
    if(typeof document != 'undefined'){
      const createTask = document.querySelector('.'+filterTasksStyles.filter)
      createTask?.classList.toggle(filterTasksStyles.show)
    }
  }

  return (
    <div className={styles.options}>
      <div onClick={openAndCloseSearch} className={styles.option}>
        <BiSearch className={styles.icon} />
      </div>
      <div onClick={showForm} className={styles.option}>
        <BiPlus className={styles.icon} />
      </div>
      <div onClick={showFilter} className={styles.option}>
        <BiFilter className={styles.icon} />
      </div>
    </div>
  )
}