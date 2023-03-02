'use client'

import styles from './profile.module.css'
import { useEffect, useState, ChangeEvent, useRef } from 'react'
import { BiEdit, BiSave } from 'react-icons/bi'
import { useUser } from 'app/context/contexts'
import Image from 'next/image'
import UpdateImage from '../components/updateImage/UpdateImage'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function UserPage(){
  const inputRef = useRef<HTMLInputElement>(null)
  const [edit, setEdit] = useState(false)
  const [updateImage, setUpdateImage] = useState(false)
  const { user } = useUser()
  const [newName, setNewName] = useState('')

  const activeInput = () => {
    if(inputRef.current){
      inputRef.current.classList.toggle(styles.active)
      inputRef.current.focus()
    }
  }
  
  const desactiveInput = () => {
    if(inputRef.current){
      inputRef.current.classList.toggle(styles.active)
      inputRef.current.blur()

      if(newName){
        fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
          },
          body: JSON.stringify({name: newName})
        }).then(prom=> prom.json()).then(res=> {
          // console.log(res)
        }).catch(()=> console.error('Error in update user name'))
      }
    }
  }

  const handlerChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if(value.trim()){
      setNewName(value)
      if(value != user?.name){
        if(!edit) setEdit(true)
      }else{
        if(edit) setEdit(false)
      }
    }
  }

  const openUpdateImage = () => {
    setUpdateImage(true)
  }

  return (
    <section className={styles.profile}>
      {updateImage && <UpdateImage setUpdateImage={setUpdateImage} imageUrl={user?.imageUrl || null} token={token} />}

      <div className={styles.container}>
        <div className={styles['user-image']}>
          {user?.imageUrl ? 
            <img onClick={openUpdateImage} src={user.imageUrl} alt={user.name} /> :
            <Image onClick={openUpdateImage} src={'/images/user.png'} alt={'User image'} width={100} height={100} />
          }
        </div>
        <div className={styles['user-details']}>
          <div className={styles['user-name']}>
            <input ref={inputRef} onChange={handlerChange} onBlur={desactiveInput} type="text" defaultValue={user?.name} /> 
            {edit ? <BiSave className={styles.icon} onClick={desactiveInput} /> : <BiEdit className={styles.icon} onClick={activeInput} />}
          </div>
          <div className={styles['user-email']}>
            <span>Email</span>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}