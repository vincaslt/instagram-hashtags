// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Hashtag, Category } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

type Data = (Hashtag & {
  categories: Category[]
})[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const hashtags = await prisma.hashtag.findMany({
    include: {
      categories: true,
    },
  })

  res.status(200).json(hashtags)
}
