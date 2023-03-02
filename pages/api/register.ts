import { NextApiRequest, NextApiResponse } from "next";
import { endPoint } from "./config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req
  
  switch (method) {
    case 'POST': 
      try {
        const { name, email, password } = body
        console.log({name, email, password})
        const prom = await fetch(`${endPoint}auth/register`, {
          method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name, email, password
          })
        })
        const data = await prom.json()
        console.log(data)
        return res.json(data)

      } catch (error: any) {
        return res.status(400).json({message: error.message})
      }

    default: 
      return res.status(400).json("Metodo not allowed")
  }
}