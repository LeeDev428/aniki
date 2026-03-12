'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MyOrdersPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard/orders')
  }, [router])

  return null
}
