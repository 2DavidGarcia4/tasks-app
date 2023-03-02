import './globals.css'

import Header from './components/shared/header/Header'
import UserProvider from './context/userProvider'

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
