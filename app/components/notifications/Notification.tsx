import styles from './notifications.module.css'

import { useEffect, useRef } from 'react'
import { useNotifications } from 'app/context/contexts'
import { Notification } from "app/types";
import { IoMdWarning } from 'react-icons/io'
import { BsCheckCircleFill, BsInfoCircleFill, BsXCircleFill, BsX } from 'react-icons/bs'

export default function Card({noti}: {noti: Notification}){
  const notificationRef = useRef<HTMLLIElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const { deleteNotification } = useNotifications()

  const deleteNoti = () => {
    notificationRef.current?.classList.add(styles.hide)
    deleteNotification(noti)
  }

  useEffect(()=> {
    if(typeof Audio != 'undefined'){
      const sound = new Audio('./sounds/sound.wav')
      if(sound){
        sound.volume = 0.2
        sound.play()
      }
    }

    if(noti.time){
      setTimeout(()=>{
        deleteNoti()
      }, noti.time)
    }
  }, [])

  return (
    <li ref={notificationRef} className={`${styles.notification} ${styles[noti.type]}`}  >
      <div className={styles.column}>
        {noti.type == 'success' ? <BsCheckCircleFill className={styles.icon} /> : noti.type == 'warning' ? <IoMdWarning className={styles.icon} /> : noti.type == 'error' ? <BsXCircleFill className={styles.icon} /> : <BsInfoCircleFill className={styles.icon} />}
        <span className={styles.content}>{noti.content}</span>
      </div>
      <BsX className={styles.close} onClick={deleteNoti} />
      <div ref={lineRef} style={{animationDuration: `${(noti.time ? noti.time/1000 : 0)}s`}} className={styles.line}></div>
    </li>
  )
}