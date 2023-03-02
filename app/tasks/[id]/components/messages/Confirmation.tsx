

import styles from './confirmation.module.css'
import { BiX, BiCheck } from 'react-icons/bi'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function Confirmation({taskData, toggle, redireact}: {taskData: {id: string | undefined, title: string | undefined}, toggle: ()=> void, redireact: ()=> void}) {

  const close = () => {
    toggle()
  }

  const deleteTask = () => {
    fetch(`/api/tasks/${taskData?.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`
      }
    }).then(prom=> prom.json()).then((res)=> {
      console.log(res)

      redireact()
    }).catch(()=> console.error('Error in delete task'))
  }

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <p className={styles.text}>are you sure to delete the task <b>{taskData.title}</b></p>
        <div className={styles.buttons}>
          <button onClick={deleteTask} className={styles.confirm}><BiCheck /> Confirm</button>
          <button onClick={close} className={styles.cancel}><BiX /> Cancel</button>
        </div>
      </div>
    </div>
  )
}