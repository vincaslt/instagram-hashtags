// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = string[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dummyHashtags = [
    'TestHashtag1',
    'TestHashtag2',
    'TestHashtag3',
    'asdasdad',
    'asdasdasd',
    'fwqfewefwfe',
    'asdacascasc',
  ]

  res.status(200).json(dummyHashtags)
}
