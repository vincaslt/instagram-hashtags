const filters = [
  { value: 'white', label: 'White', checked: false },
  { value: 'beige', label: 'Beige', checked: false },
  { value: 'blue', label: 'Blue', checked: true },
  { value: 'brown', label: 'Brown', checked: false },
  { value: 'green', label: 'Green', checked: false },
  { value: 'purple', label: 'Purple', checked: false },
  { value: 'white', label: 'White', checked: false },
  { value: 'beige', label: 'Beige', checked: false },
  { value: 'blue', label: 'Blue', checked: true },
  { value: 'brown', label: 'Brown', checked: false },
  { value: 'green', label: 'Green', checked: false },
  { value: 'purple', label: 'Purple', checked: false },
  { value: 'white', label: 'White', checked: false },
  { value: 'beige', label: 'Beige', checked: false },
  { value: 'blue', label: 'Blue', checked: true },
  { value: 'brown', label: 'Brown', checked: false },
  { value: 'green', label: 'Green', checked: false },
  { value: 'purple', label: 'Purple', checked: false },
  { value: 'white', label: 'White', checked: false },
  { value: 'beige', label: 'Beige', checked: false },
  { value: 'blue', label: 'Blue', checked: true },
  { value: 'brown', label: 'Brown', checked: false },
  { value: 'green', label: 'Green', checked: false },
  { value: 'purple', label: 'Purple', checked: false },
]

export default function Filters() {
  return (
    <form className="space-y-4">
      {filters.map((filter) => (
        <div key={filter.value} className="flex items-center">
          <input
            id={`filter-${filter.value}`}
            name={`filters[]`}
            defaultValue={filter.value}
            type="checkbox"
            defaultChecked={filter.checked}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor={`filter-${filter.value}`}
            className="ml-3 min-w-0 flex-1 text-gray-500"
          >
            {filter.label}
          </label>
        </div>
      ))}
    </form>
  )
}
