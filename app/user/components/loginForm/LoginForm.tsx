'use client'

import '../../../../styles/forms.css'
import { FormEvent, useState } from 'react'
import { BiLogIn, BiError } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useNotifications, useUser } from 'app/context/contexts'

export default function LoginForm(){
  const router = useRouter()
  const [correctCredentials, setCorrectCredentials] = useState(true)
  const { setUser } = useUser()
  const { createNotification } = useNotifications()

  const handleSubmint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value
    fetch(`/api/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(prom=> prom.json()).then(res=> {
      if(res.token){
        if(typeof localStorage != 'undefined'){
          localStorage.setItem('token', res.token)
        }

        createNotification({
          type: 'success',
          content: 'Registered successfully'
        })

        fetch('/api/user', {
          headers: {
            'Authorization': `JWT ${res.token}`
          }
        }).then(prom=> prom.json()).then(us=> {
          if(us.name) setUser(us)
        }).catch(()=> console.error('Error in get user from login'))

        router.push('/')
      }else{
        setCorrectCredentials(false)
      }
    })
    .catch(()=> {
      setCorrectCredentials(false)
    })
  }

  return (
    <form onSubmit={handleSubmint} className='form form-page'>
      <h3 className='title' ><BiLogIn/> Log in</h3>

      <div className="options">
        <div className='option'>
          <label className='label' htmlFor="email" >Email</label>
          <input className='input' id='email' type="email"  name='email' placeholder='Your email' required={true} minLength={3} maxLength={150} />
        </div>
        <div className='option'>
          <label className='label' htmlFor="password" >Password</label>
          <input className='input' id='password' type="password"  name='password' placeholder='Your password' required={true} minLength={4} maxLength={30} />
        </div>
      </div>

      {!correctCredentials && (
        <span className='error' >
          <BiError /> Email or password was not correct
        </span>
      )}
      <button className='button' >Log in</button>
      <p>Don&rsquo;t have an account?, <Link href={'/user/register'}>sign up</Link></p>
    </form>
  )
}