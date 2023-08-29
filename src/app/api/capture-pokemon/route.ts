import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

 
type ResponseData = {
  message: string
}

const prisma = new PrismaClient()
 
export async function POST(
  req: Request,
  res: Response
) {
  const allPokemons = await prisma.pokemon.findUnique({
    where: {
      id: 10
    }
  })
  const takeType = await prisma.type.findMany({
    where: {
      idPokemon: 10
    }
  })
  const takestatus = await prisma.status.findMany({
    where: {
      idPokemon: 10
    }
  })

  const body = await req.json()
  const isPokemonExist = body.find((pokemon) => pokemon.id === allPokemons.id)

  if(isPokemonExist) {
    return NextResponse.json(
      { error: `O Pokemon ${isPokemonExist.name} já está capturado`},
      { status: 400}
    )
  }

  body.map(async (resp) => {
    await prisma.pokemon.create({
      data: {
        id: resp.id,
        name: resp.name,     
        generation: resp.generation,
        color: resp.color,  
        status: {
          create: resp.status
        },
        type: {
          create: resp.type
        },
      }
    })
  })
  
  // const { searchParams } = new URL(req.url)
  // const id = searchParams.get('id')
  

  // const prisma = new PrismaClient()
  // const a = await prisma.pokemon.create({
  //   data: {
  //     name: "Bulbasaur",
  //     generation: "Bulbasaur",
  //     color: "Bulbasaur",
  //     id: 1,
  //   }
  // })
  // console.log("dsaas", body)
  
  return NextResponse.json( body, { status: 200})
}