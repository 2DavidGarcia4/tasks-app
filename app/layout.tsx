import './globals.css'

import Header from './components/shared/header/Header'
import Options from './components/options/Options'
import Search from './components/options/search/Search'

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Header />
        <Options />
        <Search />
        {children}
      </body>
    </html>
  )
}
