'use client'

import styles from './options.module.css'
import searchStyles from './search/search.module.css'
import createTaskStyles from './createTask/createTask.module.css'
import filterTasksStyles from './filter/filterTasks.module.css'

import { BiSearch } from 'react-icons/bi'
import { BiPlus } from 'react-icons/bi'
import { BiFilter } from 'react-icons/bi'
import { useTasks } from 'app/hooks/useTasks'
import { useRouter } from 'next/navigation'


export default function Options(){
  const router = useRouter()
  const {isLoged} = useTasks()
  const loged = isLoged()

  const openAndCloseSearch = () => {
    if(!loged) return router.push('/user/login/')
      
    
    if(typeof document != 'undefined'){
      const search = document.querySelector('.'+searchStyles.search)
      search?.classList.toggle(searchStyles.open)
      const searchInput = document.getElementById('search-input')

      if(search?.classList.contains(searchStyles.open)) searchInput?.focus()
      else searchInput?.blur()
    }
  }

  const showForm = () => {
    if(!loged) return router.push('/user/login/')
    if(typeof document != 'undefined'){
      const createTask = document.querySelector('.'+createTaskStyles.container)
      createTask?.classList.add(createTaskStyles.show)
    }
  }

  const showFilter = () => {
    if(!loged) return router.push('/user/login/')
    if(typeof document != 'undefined'){
      const createTask = document.querySelector('.'+filterTasksStyles.filter)
      createTask?.classList.add(filterTasksStyles.show)
    }
  }

  return (
    <div className={styles.options}>
      <BiSearch onClick={openAndCloseSearch} className={styles.icon} />
      <BiPlus onClick={showForm} className={styles.icon} />
      <BiFilter onClick={showFilter} className={styles.icon} />
    </div>
  )
}