import './globals.css'
import AddHashtagButton from './components/AddHashtagButton'
import { Filters, FiltersButton, FiltersSidebar } from './components/Filters'
import CopyHashtagsButton from './components/CopyHashtagsButton'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-slate-50">
        <div className="flex flex-col lg:flex-row h-screen">
          <FiltersSidebar className="bg-white hidden md:block">
            <Filters />
          </FiltersSidebar>

          <div className="overflow-auto p-6 flex-1">{children}</div>
        </div>

        <div className="fixed justify-end items-center bottom-0 inset-x-0 flex p-3 space-x-1">
          <CopyHashtagsButton />
          <AddHashtagButton />
        </div>
      </body>
    </html>
  )
}
