// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = string[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query)

  const hashtags = ['test_hashtag1', 'test_2', 'test_hashtag_3']

  res.status(200).json(hashtags)
}
