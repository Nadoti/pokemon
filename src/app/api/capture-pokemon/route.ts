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

  const body = await req.json()
  const allPokemons = await prisma.pokemon.findMany()
  const isPokemonExist = body.find((pokemon) => {
    return allPokemons.some((element) => element.id === pokemon.id);
  });

  if(isPokemonExist) {
    return NextResponse.json(
      { error: `The pokemon ${isPokemonExist.name} is already captured`},
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
  
  return NextResponse.json( body, { status: 200})
}