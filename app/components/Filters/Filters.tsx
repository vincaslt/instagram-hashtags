import { Category } from '@prisma/client'

export default async function Filters() {
  const categories = await fetchCategories()

  return (
    <form className="space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              name={`filters[]`}
              defaultValue={category.id}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="ml-3 min-w-0 flex-1 text-gray-500">
              {category.title}
            </span>
          </label>
        </div>
      ))}
    </form>
  )
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${process.env.API_URL}/categories`)
  return response.json()
}
