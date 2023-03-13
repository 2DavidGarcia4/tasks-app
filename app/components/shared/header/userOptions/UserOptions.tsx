'use client'

import styles from './userOptions.module.css'

import Image from 'next/image'
import Link from 'next/link'
import { BiX, BiMoon, BiSun } from 'react-icons/bi'
import { useRef, useEffect, useState } from 'react'
import { useNotifications, useTasks, useUser } from 'app/context/contexts'
import { useRouter } from 'next/navigation'

export default function UserOptions(){
  const userOptions = useRef<HTMLDivElement>(null)
  const circleThemeRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)
  const { user, setUser } = useUser()
  const { createNotification } = useNotifications()
  const { setTasks } = useTasks()

  useEffect(()=> {
    if(typeof localStorage != 'undefined') {
      const token = localStorage.getItem('token')
      let localDark = JSON.parse(localStorage.getItem('dark') || 'false')

      if(localDark) {
        document.body.classList.add('dark')
        circleThemeRef.current?.classList.add(styles.dark)
        setIsDark(true)
      }

      fetch('/api/user', {
        headers: {
          'Authorization': `JWT ${token}`
        }
      }).then(prom=> prom.json()).then(res=> {
        if(res.name) {
          setUser(res)
          createNotification({
            type: 'success',
            content: 'Uploaded user data'
          })
        }
      }).catch(()=> console.error('Error in user options'))
    }
  }, [setUser])

  const openAndCloseUserOptions = () => {
    let element = userOptions.current
    if(element){
      element.classList.toggle(styles.open)
    }
  }

  const toggleTheme = () => {
    if(typeof document != 'undefined'){
      document.body.classList.toggle('dark')
    }

    if(typeof localStorage != 'undefined'){
      localStorage.setItem('dark', `${!isDark}`)
    }

    if(circleThemeRef.current){
      circleThemeRef.current.classList.toggle(styles.dark)
    }

    setIsDark(!isDark)
  }

  const logOut = () => {
    if(typeof localStorage != 'undefined'){
      localStorage.removeItem('token')
    }

    openAndCloseUserOptions()
    setUser(undefined)
    setTasks([])
    router.push('/')
  }
  
  return (
    <div className={styles.container}>
      {user?.imageUrl ? 
        <img onClick={openAndCloseUserOptions} className={styles.navImage} src={user.imageUrl} alt={user.name} /> :
        <Image onClick={openAndCloseUserOptions} className={styles.navImage} src={'/images/user.png'} alt='User icon' width={40} height={40} />
      }

      <div ref={userOptions} className={styles['user-options']}>
        <BiX onClick={openAndCloseUserOptions} className={styles.icon} />
        <div className={styles['switch-theme']} onClick={toggleTheme} >
          <div ref={circleThemeRef} className={styles['circle-theme']}>
            { isDark ?
              <BiMoon className={styles['icon-theme']} /> : 
              <BiSun className={styles['icon-theme']} />
            } 
          </div>
        </div>

        <div className={styles['user-profile']}>
          {user?.imageUrl ? 
            <img className={styles.userImage} src={user.imageUrl} alt={user.name} /> : 
            <Image className={styles.userImage} src={'/images/user.png'} alt='User icon' width={70} height={70} />
          }
          <p className={styles['user-name']}>{user?.name || 'User'}</p>
        </div>

        <div className={styles['user-links']}>
          {user ? 
            (
              <>
                <Link onClick={openAndCloseUserOptions} className={styles['user-link']} href={'/user/profile'}>Profile</Link>
                <button onClick={logOut} className={styles['user-link']}>Log out</button>
              </>
            ) :
            (
              <>
                <Link onClick={openAndCloseUserOptions} className={styles['user-link']} href={'/user/login'} >Log in</Link>
                <Link onClick={openAndCloseUserOptions} className={styles['user-link']} href={'/user/register'} >Sign up</Link>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}