'use client'

import '../../../../styles/forms.css'
import { FormEvent, useState, useRef, useEffect } from 'react'
import { BiNote, BiShow, BiHide } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { useLogin } from 'app/hooks/useLogin'
import { useNotifications, useUser } from 'app/context/contexts'
import Link from 'next/link'

export default function RegisterForm(){
  const [showPassword, setShowPassword] = useState(false)
  const inputPasswordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const isLoged = useLogin()
  const { setUser } = useUser()
  const { createNotification } = useNotifications()
  
  useEffect(()=> {
    if(isLoged){
      router.push('/')
    }
  }, [isLoged])
  
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
      if(res.name) {
        setUser(res)
        createNotification({
          type: 'success',
          content: 'Registered successfully'
        })
      }

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

  const togglePassword = () => {
    if(inputPasswordRef.current?.type) {
      if(showPassword) inputPasswordRef.current.type = 'password'
      else inputPasswordRef.current.type = 'text'
      setShowPassword(v=> !v)
    } 
  }

  return (
    <form onSubmit={handleSubmint} className='form form-page'>
      <h3 className='title' ><BiNote/> Sign up</h3>

      <div className='options'>
        <div className='option'>
          <label className='label' htmlFor="userName" >User name</label>
          <input className='input' id='userName' type="text" name='userName' placeholder='Your name' required={true} minLength={3} maxLength={100} />
        </div>
        <div className='option'>
          <label className='label' htmlFor="email" >Email</label>
          <input className='input' id='email' type="email" name='email' placeholder='Your email' required={true} />
        </div>
        <div className='option'>
          <label className='label' htmlFor="password" >Password</label>
          <input ref={inputPasswordRef} className='input' id='password' type="password" name='password' placeholder='Your password' required={true} minLength={6} maxLength={20} />
          {showPassword ? <BiShow onClick={togglePassword} className='input-icon' /> : <BiHide onClick={togglePassword} className='input-icon' />}
        </div>

      </div>
      
      <button className='button' >Sign up</button>
      <p className='footer'>You have an account?, <Link href={'/user/login'}>log in</Link></p>
    </form>
  )
}