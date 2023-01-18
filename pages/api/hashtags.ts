// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // TODO: validate with zod
    const { hashtag } = JSON.parse(req.body)

    await prisma.hashtag.create({
      data: { name: hashtag },
    })

    return res.status(200).send('OK')
  }

  if (req.method === 'GET') {
    const hashtags = await prisma.hashtag.findMany({
      include: {
        categories: true,
      },
    })

    return res.status(200).json(hashtags)
  }

  res.status(405).send('Method Not Allowed')
}
