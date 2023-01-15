// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Category } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

type Data = Category[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await prisma.category.findMany()

  res.status(200).json(categories)
}
