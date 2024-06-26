import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import SessionProvider from '../components/SessionProvider'
import Navbar from '../components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children} : any) {
  const session = await getServerSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-slate-800 text-black dark:text-white w-full h-full`}>
        <div className='max-w-[1400px] mx-auto'>
            <SessionProvider session={session}>
              <Navbar />
              {children}
            </SessionProvider>
        </div>
      </body>
    </html>
  )
}