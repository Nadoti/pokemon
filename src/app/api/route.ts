import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

 
type ResponseData = {
  message: string
}

const prisma = new PrismaClient()
 
export async function GET(
  req: Request
) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const prisma = new PrismaClient()
  const a = await prisma.pokemon.findMany()
  console.log(a)
  const teste = [
    {
      name: "Douglas"
    },
    {
      name: "Jao"
    },{
      name: "da"
    },
  ]
  return NextResponse.json({ teste })
}

// export async function GET(req: NextApiRequest,
//   res: NextApiResponse) {
//     console.log
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  // })
  // const product = await res.json()
 
  // return NextResponse.json({ product })
// }
