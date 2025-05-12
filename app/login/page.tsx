import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Unireal - Bolsas de Estudo",
  description:
    "Acesse sua conta Unireal e gerencie suas bolsas de estudo para cursos de graduação nas faculdades Unireal e UnirealEAD",
  openGraph: {
    title: "Login | Unireal - Bolsas de Estudo",
    description: "Acesse sua conta Unireal e gerencie suas bolsas de estudo para cursos de graduação",
    images: [{ url: "/og-image.jpg" }],
  },
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative h-16 w-32">
              <Image src="/logo.png" alt="Unireal Logo" fill className="object-contain" />
            </div>
            <h2 className="text-3xl font-bold">Entre na sua conta</h2>
            <p className="text-muted-foreground">Digite seu email para receber um link de acesso</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>

            <Button className="w-full" size="lg">
              Enviar link de acesso
            </Button>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="font-medium text-primary hover:underline">
                  Criar Conta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
