'use client'

import { Notification, ConfigCreateNotifi } from "app/types";
import { useReducer, useCallback } from "react";
import { NotificationsContext } from "./contexts";
import { notificationReducer } from "./reducers/notificationReducer";


export default function NotificationsProvider({ children }: {children: React.ReactNode}) {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const createNotification = useCallback((config: ConfigCreateNotifi) => {
    const time = typeof config.time == 'number' ? config.time : 8000
    
    dispatch({type: 'ADD', payload: {
      id: ''+Math.floor(Math.random()*888)+111,
      time,
      ...config
    }})
  }, [])

  const deleteNotification = (noti: Notification) => {
    setTimeout(()=> {
      dispatch({type: 'DELETE', payload: noti})
    }, 500)
  }

  return (
    <NotificationsContext.Provider value={{notifications, createNotification, deleteNotification}} >
      {children}
    </NotificationsContext.Provider>
  );
}