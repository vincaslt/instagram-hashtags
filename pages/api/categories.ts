// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  name: string
}[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dummyCategories = [
    {
      id: '1',
      name: 'Test Category 1',
    },
    {
      id: '2',
      name: 'Test Category 2',
    },
    {
      id: '3',
      name: 'Test Category 3',
    },
  ]

  res.status(200).json(dummyCategories)
}
