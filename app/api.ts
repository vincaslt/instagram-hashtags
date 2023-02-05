import { Category, Hashtag } from '@prisma/client'

export async function fetchHashtags(): Promise<
  (Hashtag & {
    categories: Category[]
  })[]
> {
  const response = await fetch(`${process.env.API_URL}/hashtags`, {
    cache: 'no-store',
  })
  return response.json()
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${process.env.API_URL}/categories`, {
    cache: 'no-store',
  })
  return response.json()
}

export async function createNewHashtag(
  hashtag: string,
  categories: string[] = []
) {
  const response = await fetch('api/hashtags', {
    method: 'POST',
    body: JSON.stringify({ hashtag, categories }),
    cache: 'no-store',
  })
  return response.json()
}
