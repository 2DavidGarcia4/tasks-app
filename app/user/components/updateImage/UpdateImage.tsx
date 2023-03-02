import 'styles/forms.css'
import styles from './updateImage.module.css'

import { Dispatch, SetStateAction, FormEvent } from 'react'
import { BiX, BiLoader } from 'react-icons/bi'
import { useUser } from 'app/context/contexts'

export default function UpdateImage({setUpdateImage, imageUrl, token}: {setUpdateImage: Dispatch<SetStateAction<boolean>>, imageUrl: string | null, token: string | null}){
  const { setUser } = useUser()

  const close = () => {
    setUpdateImage(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const imageUrl = event.currentTarget.imageUrl.value
    
    fetch(`/api/user`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${token}`
      },
      body: JSON.stringify({imageUrl})
    }).then(prom=> prom.json()).then(res=> {
      if(res.length){
        fetch(`/api/user`, {
          headers: {
            'Authorization': `JWT ${token}`
          }
        }).then(prom=> prom.json()).then(resu=>{
          setUser(resu)
        }).catch(()=> console.error('Error in get user after image update'))
      }
      close()
    }).catch(()=> console.error('Error in update user image'))
  } 

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={`${styles.form} form form-page`}>
        <BiX onClick={close} className={styles.close} />

        <div className={styles.inputs}>
          <div>
            <label className='label' htmlFor="imageUrl" >Image url</label>
            <input className='input' id='imageUrl' type="url" defaultValue={imageUrl || undefined} name='imageUrl' required={true} minLength={3} />
          </div>
        </div>

        <button className='button' ><BiLoader /> Update</button>

      </form>
    </div>
  )
}