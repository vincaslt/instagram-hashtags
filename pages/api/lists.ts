// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number
  name: string
}[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dummyLists = [
    {
      id: 1,
      name: 'Test List 1',
    },
    {
      id: 2,
      name: 'Test List 2',
    },
    {
      id: 3,
      name: 'Test List 3',
    },
  ]

  res.status(200).json(dummyLists)
}
