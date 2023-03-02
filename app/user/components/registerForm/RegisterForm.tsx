'use client'

import '../../../../styles/forms.css'
import { FormEvent } from 'react'
import { BiNote } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { useLogin } from 'app/hooks/useLogin'
import { useUser } from 'app/context/contexts'

export default function RegisterForm(){
  const router = useRouter()
  const isLoged = useLogin()
  const { setUser } = useUser()
  
  
  const handleSubmint = (event: FormEvent<HTMLFormElement>) => {
    if(isLoged) router.push('/')
    event.preventDefault()

    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value
    const name = event.currentTarget.userName.value
    fetch(`/api/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }).then(prom=> prom.json()).then(res=> {
      if(res.name) setUser(res)
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
          router.push('/')
        }
      })
      .catch(()=> console.error('Register and login Error'))
    })
    .catch(()=> console.error('Register Error'))
  }

  return (
    <form onSubmit={handleSubmint} className='form form-page'>
      <h3><BiNote/> Sign up</h3>
      <div>
        <label className='label' htmlFor="userName" >User name</label>
        <input className='input' id='userName' type="text" placeholder='Your user name' name='userName' required={true} minLength={3} maxLength={100} />
      </div>
      <div>
        <label className='label' htmlFor="email" >Email</label>
        <input className='input' id='email' type="email" placeholder='Your email' name='email' required={true} minLength={3} maxLength={150} />
      </div>
      <div>
        <label className='label' htmlFor="password" >Password</label>
        <input className='input' id='password' type="password" placeholder='Your password' name='password' required={true} minLength={4} maxLength={30} />
      </div>
      
      <button className='button' >Sign up</button>
    </form>
  )
}