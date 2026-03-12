'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function DashboardOrdersRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/user/orders') }, [router])
  return null
}
