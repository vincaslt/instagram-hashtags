import { FiltersSidebar } from './components/Filters'
import './globals.css'

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
      <body className="bg-white">
        <div className="flex lg:flex-row h-screen">
          <FiltersSidebar />
          <div className="overflow-auto p-6 flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}
