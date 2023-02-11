'use client'

import styles from './userOptions.module.css'

import Image from 'next/image'
import Link from 'next/link'
import { BiX } from 'react-icons/bi'
import { useRef } from 'react'

export default function UserOptions(){
  const userOptions = useRef<HTMLDivElement>(null)
  
  const openAndCloseUserOptions = () => {
    let element = userOptions.current
    if(element){
      element.classList.toggle(styles.open)
    }
  }
  
  return (
    <div className={styles.container}>
      <Image onClick={openAndCloseUserOptions} className={styles.userImage} src={'/images/user.png'} alt='User icon' width={40} height={40} />

      <div ref={userOptions} className={styles['user-options']}>
        <BiX onClick={openAndCloseUserOptions} className={styles.icon} />
        {/* <img className={styles.userImage} src="https://cdn.discordapp.com/avatars/717420870267830382/400b2bc9bce2bdec52b4452934860214.webp" alt="User icon" /> */}
        <div className={styles['user-profile']}>
          <Image className={styles.userImage} src={'/images/user.png'} alt='User icon' width={60} height={60} />
          <p className={styles['user-name']}>{false ? 'Hola' : 'User'}</p>
        </div>

        {false ? <Link className={styles['link-profile']} href={'/user/profile'}>Profile</Link> : (
          <div className={styles['user-other-links']}>
            <Link className={styles['user-link']} href={'/user/login'} >
              Log in
            </Link>
            <Link className={styles['user-link']} href={'/user/register'} >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}