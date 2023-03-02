import { NextApiRequest, NextApiResponse } from "next";
import { endPoint } from "../config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req

  switch (method) {
    case 'GET':
      try {
        const prom = await fetch(`${endPoint}users/me`, {
          headers: {
            "Authorization": `${headers.authorization}`
          }
        })

        await prom.json()
        return res.json({
          message: 'Correct credentials',
          isVerified: true
        })

      } catch (error: any) {
        return res.json({
          message: 'Invalid credentials',
          isVerified: false
        })
      }
    
    default: 
      return res.status(400).json("Metodo not allowed")
  }

}