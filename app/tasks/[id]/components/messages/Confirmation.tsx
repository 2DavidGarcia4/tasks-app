import styles from './confirmation.module.css'
import { BiX, BiCheck } from 'react-icons/bi'
import { useNotifications } from 'app/context/contexts'

let token: string | null = ''
if(typeof localStorage != 'undefined') token = localStorage.getItem('token')

export default function Confirmation({taskData, toggle, redireact}: {taskData: {id: string | undefined, title: string | undefined}, toggle: ()=> void, redireact: ()=> void}) {
  const { createNotification } = useNotifications()

  const deleteTask = () => {
    fetch(`/api/tasks/${taskData?.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`
      }
    }).then(prom=> prom.json()).then((res)=> {
      createNotification({
        type: 'success',
        content: 'Deleted task'
      })
      redireact()
    }).catch(()=> {
      console.error('Error in delete task')
      createNotification({
        type: 'error',
        content: 'Error deleting task'
      })
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <p className={styles.text}>Are you sure to delete the task: <b>{taskData.title}</b></p>
        <div className={styles.buttons}>
          <button onClick={deleteTask} className={styles.confirm}><BiCheck className={styles.icon} /> Confirm</button>
          <button onClick={toggle} className={styles.cancel}><BiX className={styles.icon} /> Cancel</button>
        </div>
      </div>
    </div>
  )
}