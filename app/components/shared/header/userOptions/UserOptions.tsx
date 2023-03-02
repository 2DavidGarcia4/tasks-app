'use client'

import styles from './userOptions.module.css'

import Image from 'next/image'
import Link from 'next/link'
import { BiX } from 'react-icons/bi'
import { useRef, useEffect } from 'react'
import { useUser } from 'app/context/contexts'

export default function UserOptions(){
  const userOptions = useRef<HTMLDivElement>(null)
  const { user, setUser } = useUser()
  
  useEffect(()=> {
    if(typeof localStorage != 'undefined') {
      const token = localStorage.getItem('token')

      fetch('/api/user', {
        headers: {
          'Authorization': `JWT ${token}`
        }
      }).then(prom=> prom.json()).then(res=> {
        if(res.name) setUser(res)
      }).catch(()=> console.error('Error in user options'))
    }
  }, [setUser])

  const openAndCloseUserOptions = () => {
    let element = userOptions.current
    if(element){
      element.classList.toggle(styles.open)
    }
  }
  
  return (
    <div className={styles.container}>
      {user?.imageUrl ? 
        <img onClick={openAndCloseUserOptions} className={styles.navImage} src={user.imageUrl} alt={user.name} /> :
        <Image onClick={openAndCloseUserOptions} className={styles.navImage} src={'/images/user.png'} alt='User icon' width={40} height={40} />
      }

      <div ref={userOptions} className={styles['user-options']}>
        <BiX onClick={openAndCloseUserOptions} className={styles.icon} />
        <div className={styles['user-profile']}>
          {user?.imageUrl ? 
            <img className={styles.userImage} src={user.imageUrl} alt={user.name} /> : 
            <Image className={styles.userImage} src={'/images/user.png'} alt='User icon' width={70} height={70} />
          }
          <p className={styles['user-name']}>{user?.name || 'User'}</p>
        </div>

        {user ? <Link onClick={openAndCloseUserOptions} className={styles['link-profile']} href={'/user/profile'}>Profile</Link> : (
          <div className={styles['user-other-links']}>
            <Link onClick={openAndCloseUserOptions} className={styles['user-link']} href={'/user/login'} >
              Log in
            </Link>
            <Link onClick={openAndCloseUserOptions} className={styles['user-link']} href={'/user/register'} >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}