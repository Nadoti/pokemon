import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

 
type ResponseData = {
  message: string
}

const prisma = new PrismaClient()


export async function POST(req: Request) {
  const body = await req.json();

  await prisma.status.deleteMany({
    where: {
      idPokemon: body.id,
    },
  });
  
  await prisma.type.deleteMany({
    where: {
      idPokemon: body.id,
    },
  });
  
  await prisma.pokemon.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({message: "success"}, { status: 200 });
}
