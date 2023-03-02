import { NextApiRequest, NextApiResponse } from "next";
import { endPoint } from "../config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, headers } = req

  switch (method) {
    case 'GET':
      try {
        const prom = await fetch(`${endPoint}tasks`, {
          headers: {
            'Authorization': `${headers.authorization}`
          }
        })
        const data = await prom.json()
    
        return res.json(data)
        
      } catch (error) {
        return res.json([])
      }
    
    case 'POST':
      try {
        const { title, description, notificationAt } = body
        console.log({title, description, notificationAt})
        console.log(headers.authorization)
        const prom = await fetch(`${endPoint}tasks`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${headers.authorization}`
          },
          body: JSON.stringify({
            title, description, notificationAt
          })
        })

        const data = await prom.json()
        return res.json(data)

      } catch (error: any) {
        return res.status(400).json({message: error.message})
      }

    default: 
      return res.status(400).json("Metodo not allowed")
  }
}