// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // TODO: validate with zod
    const {
      hashtag: name,
      categories: categoryIds,
    }: { hashtag: string; categories: string[] } = JSON.parse(req.body)

    const hashtag = await prisma.hashtag.create({
      data: {
        name,
        categories: { connect: categoryIds.map((id) => ({ id })) },
      },
    })

    return res.status(200).send({ hashtag })
  }

  if (req.method === 'GET') {
    const hashtags = await prisma.hashtag.findMany({
      include: {
        categories: true,
      },
    })

    return res.status(200).json(hashtags)
  }

  if (req.method === 'DELETE') {
    const { ids }: { ids: string[] } = JSON.parse(req.body)

    const hashtags = await prisma.hashtag.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    return res.status(200).json(hashtags)
  }

  res.status(405).send('Method Not Allowed')
}
