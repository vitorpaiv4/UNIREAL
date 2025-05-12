"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Evitar renderização no servidor para prevenir erros de hidratação
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b h-16">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6"></div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-32">
            <Image src="/iconee.png" alt="Unireal Logo" fill className="object-contain" priority />
          </div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Início
          </Link>
          <Link
            href="/bolsas"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/bolsas" || pathname.startsWith("/bolsas/") ? "text-primary" : "text-muted-foreground",
            )}
          >
            Bolsas
          </Link>
          <Link
            href="/instituicoes"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/instituicoes" || pathname.startsWith("/instituicoes/")
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            Instituições
          </Link>
          <Link
            href="/sobre"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/sobre" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Sobre Nós
          </Link>
          <Link
            href="/contato"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/contato" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Contato
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/login" className="hidden md:block">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/cadastro" className="hidden md:block">
            <Button>Criar Conta</Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Início
                </Link>
                <Link
                  href="/bolsas"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/bolsas" || pathname.startsWith("/bolsas/")
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  Bolsas
                </Link>
                <Link
                  href="/instituicoes"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/instituicoes" || pathname.startsWith("/instituicoes/")
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  Instituições
                </Link>
                <Link
                  href="/sobre"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/sobre" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Sobre Nós
                </Link>
                <Link
                  href="/contato"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/contato" ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  Contato
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/cadastro">
                    <Button className="w-full">Criar Conta</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
