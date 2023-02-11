'use client'

import styles from './options.module.css'
import searchStyles from './search/search.module.css'

import { BiSearch } from 'react-icons/bi'
import { BiPlus } from 'react-icons/bi'
import { BiFilter } from 'react-icons/bi'

export default function Options(){
  const openAndCloseSearch = () => {
    if(typeof document != undefined){
      const search = document.querySelector('.'+searchStyles.search)
      search?.classList.toggle(searchStyles.open)
      const searchInput = document.getElementById('search-input')

      if(search?.classList.contains(searchStyles.open)) searchInput?.focus()
      else searchInput?.blur()
    }
  }

  return (
    <div className={styles.options}>
      <BiSearch onClick={openAndCloseSearch} className={styles.icon} />
      <BiPlus className={styles.icon} />
      <BiFilter className={styles.icon} />
    </div>
  )
}