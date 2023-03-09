'use client'

import styles from './header.module.css'

import Image from 'next/image'
import Link from 'next/link'
import UserOptions from './userOptions/UserOptions'
import { useRef } from 'react'

export default function Header(){
  const headerRef = useRef<HTMLElement>(null)

  if(typeof document != "undefined"){
    document.addEventListener('scroll', () => {
      headerRef.current?.classList.toggle(styles.active, window.scrollY > 80)
    })
  }

  return (
    <header ref={headerRef} className={styles.header}>
      <Link href={'/'} className={styles.title}>
        <Image src={'/images/icon.png'} alt='Icon' width={40} height={40} />
        <h1>
          Tasks APP
        </h1>
      </Link>

      <UserOptions />
    </header>
  )
}