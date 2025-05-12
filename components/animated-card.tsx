"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  // Reduzir a intensidade das animações para melhorar a performance
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay }}
      whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
      className="h-full"
    >
      <Card className={cn("h-full", className)}>{children}</Card>
    </motion.div>
  )
}
