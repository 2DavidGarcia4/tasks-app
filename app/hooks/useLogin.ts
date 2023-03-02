import { useState, useEffect } from 'react'

export const useLogin = () => {
  const [loged, setLoged] = useState(false)

  useEffect(()=> {
    let token = localStorage.getItem('token')
    if(token){
      fetch(`/api/user/verify`, {
        headers: {
          'Authorization': `JWT ${token}`
        }
      }).then((prom)=> prom.json()).then((res) => {
        if(res.isVerified){
          setLoged(true)
        }
      })
      .catch(()=> '')
    }
  }, [])


  return loged
}