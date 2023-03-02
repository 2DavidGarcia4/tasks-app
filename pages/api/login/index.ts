import { NextApiRequest, NextApiResponse } from "next";
import { endPoint } from "../config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  switch (method) {
    case 'GET':
      return res.json({message: 'Login?'})
      
      
    case 'POST':
      try {
        const { email, password } = body
        const prom = await fetch(`${endPoint}auth/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password
          })
        })
    
        const data = await prom.json()
        return res.json(data)
      
      } catch (error: any) {
        return res.status(400).json({
          message: error.message
        })
      }
      
    
    default: 
      return res.status(400).json("Metodo not allowed")
  }

}