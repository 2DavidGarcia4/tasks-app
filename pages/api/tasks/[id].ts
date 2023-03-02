import { NextApiRequest, NextApiResponse } from "next";
import { endPoint } from "../config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
  const { method, body, headers, query } = req

  switch (method) {
    case 'GET': 
      try {
        const { id } = query
        const prom = await fetch(`${endPoint}tasks/${id}`, {
          headers: {
            'Authorization': `${headers.authorization}`
          }
        })
    
        const data = await prom.json()
        return res.json(data)
    
      } catch (error: any) {
        return res.status(400).json({message: error.message})
      }

    case 'PUT':
      try {
        const { id } = query
        const { title, description, notificationAt, isCompleted } = body
      
        const prom = await fetch(`${endPoint}tasks/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${headers.authorization}`
          },
          body: JSON.stringify({
            title, description, notificationAt, isCompleted
          })
        })
        
        const data = await prom.json()
        return res.json(data)
      
      } catch (error: any) {
        return res.status(400).json({message: error.message})
      }

    case 'DELETE':
      try {
        const { id } = query
        const prom = await fetch(`${endPoint}tasks/${id}`, {
          method,
          headers: {
            'Authorization': `${headers.authorization}`
          }
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