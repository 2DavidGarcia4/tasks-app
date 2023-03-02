'use client'

import '../../../../styles/forms.css'
import { FormEvent, useState } from 'react'
import { BiLogIn, BiError } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from 'app/context/contexts'

export default function LoginForm(){
  const router = useRouter()
  const [correctCredentials, setCorrectCredentials] = useState(true)
  const { setUser } = useUser()

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
      <h3><BiLogIn/> Log in</h3>
      <div>
        <label className='label' htmlFor="email" >Email</label>
        <input className='input' id='email' type="email" placeholder='Your email' name='email' required={true} minLength={3} maxLength={150} />
      </div>
      <div>
        <label className='label' htmlFor="password" >Password</label>
        <input className='input' id='password' type="password" placeholder='Your password' name='password' required={true} minLength={4} maxLength={30} />
      </div>
      {!correctCredentials && (
        <span className='error' >
          <BiError /> Email or password was not correct
        </span>
      )}
      <button className='button' >Log in</button>
      <p>Don't have an account?, <Link href={'/user/register'}>sign up</Link></p>
    </form>
  )
}