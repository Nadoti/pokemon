import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

 
type ResponseData = {
  message: string
}

const prisma = new PrismaClient()


export async function PATCH(req: Request) {
  const body = await req.json();

  const updatedRecord = await prisma.status.findMany({
    where: {
      idPokemon: body.id,
    },
  });

  // Atualize os valores nos registros encontrados
  await Promise.all(
    updatedRecord.map(async (record) => {
      const updatedValue = body[record.name];
      return prisma.status.update({
        where: {
          idStatus: record.idStatus,
        },
        data: {
          baseStatus: updatedValue,
        },
      });
    })
  );

  return NextResponse.json({message: "success"}, { status: 200 });
}
