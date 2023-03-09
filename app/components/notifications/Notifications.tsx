'use client'

import styles from './notifications.module.css'

import Card from './Notification'
import { useNotifications } from 'app/context/contexts'

export default function Notifications(){
  const { notifications } = useNotifications()

  return (
    <ul className={`${styles.notifications} notifications-list`}>
      {notifications.map((m, i)=> <Card key={m.id} noti={m} />)}
    </ul>
  )
}