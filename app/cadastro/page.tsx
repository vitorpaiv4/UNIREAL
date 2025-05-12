import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criar Conta | Unireal - Bolsas de Estudo",
  description:
    "Crie sua conta no Unireal e tenha acesso às melhores bolsas de estudo para cursos de graduação nas faculdades Unireal e UnirealEAD",
  openGraph: {
    title: "Criar Conta | Unireal - Bolsas de Estudo",
    description: "Crie sua conta no Unireal e tenha acesso às melhores bolsas de estudo para cursos de graduação",
    images: [{ url: "/og-image.jpg" }],
  },
}

export default function CadastroPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="relative h-16 w-32">
              <Image src="/logo.png" alt="Unireal Logo" fill className="object-contain" />
            </div>
            <h2 className="text-3xl font-bold">Crie sua conta</h2>
            <p className="text-muted-foreground">Preencha seus dados para criar uma conta</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" placeholder="Digite seu nome completo" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" placeholder="000.000.000-00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" placeholder="(00) 00000-0000" />
            </div>

            <Button className="w-full" size="lg">
              Criar conta
            </Button>

            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Já tem uma conta?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Entrar
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
