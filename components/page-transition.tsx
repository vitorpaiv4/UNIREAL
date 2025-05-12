"use client"

import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  // Garantir que a animação só ocorra no cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Se não estiver no cliente, renderize sem animação
  if (!isClient) {
    return <>{children}</>
  }

  // Usar uma abordagem mais simples sem framer-motion para evitar problemas
  return (
    <div key={pathname} className="animate-fade-in">
      {children}
    </div>
  )
}
