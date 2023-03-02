import { NextApiRequest, NextApiResponse } from "next";
import { endPoint } from "../config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers, body } = req

  switch (method) {
    case 'GET':
      try {
        const prom = await fetch(`${endPoint}users/me`, {
          headers: {
            'Authorization': `${headers.authorization}`
          }
        })
        const data = await prom.json()
        return res.json(data)

      } catch (error: any) {
        return res.json({message: error.message})
      }

    case 'PUT':
      try {
        const { name, imageUrl } = body
        const prom = await fetch(`${endPoint}users/me`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${headers.authorization}`
          },
          body: JSON.stringify({name, imageUrl})
        })
        const data = await prom.json()
        return res.json(data)

      } catch (error: any) {
        return res.json({message: error.message})
      }

    default:
      return res.status(400).json("Metodo not allowed")
  }
}