'use client'

import { Loading } from '@/components/Loading/Loading'
import { useAuth } from '@/hooks/useAuth'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const validation = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!validation.loading) {
      setLoading(false)
    }
  }, [validation])

  if (loading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Loading />
        </body>
      </html>
    )
  }

  if (!validation.success) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex justify-center items-center w-screen h-screen">
            <span className="text-sm text-zinc-400 font-light">
              Algo de errado não está certo...
            </span>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
