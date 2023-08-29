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

  const takeAllPokemons = await prisma.$queryRaw`
  SELECT
    p.id AS pokemon_id,
    p.name AS pokemon_name,
    p.generation,
    p.color,
    t.id AS type_id,
    t.slot AS type_slot,
    t.name AS type_name,
    s.idStatus AS status_id,
    s.baseStatus,
    s.name AS status_name
  FROM
    Pokemon p
    LEFT JOIN Type t ON p.id = t.idPokemon
    LEFT JOIN Status s ON p.id = s.idPokemon;
`

  const formattedData = [];
  for (const row of takeAllPokemons) {
    const existingPokemon = formattedData.find(item => item.id === row.pokemon_id);
  
    if (!existingPokemon) {
      formattedData.push({
        id: row.pokemon_id,
        name: row.pokemon_name,
        generation: row.generation,
        color: row.color,
        status: [],
        type: [],
      });
    }
  
    const currentPokemon = formattedData.find(item => item.id === row.pokemon_id);
  
    if (row.status_id && !currentPokemon.status.some(status => status.id === row.status_id)) {
      currentPokemon.status.push({
        id: row.status_id,
        baseStatus: row.baseStatus,
        name: row.status_name,
      });
    }
  
    if (row.type_id && !currentPokemon.type.some(type => type.id === row.type_id)) {
      currentPokemon.type.push({
        id: row.type_id,
        slot: row.type_slot,
        name: row.type_name,
      });
    }
  }
  


  return NextResponse.json(formattedData, {status: 200})
}