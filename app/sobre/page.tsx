import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Users, Award, BookOpen, GraduationCap, Heart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre Nós | Unireal - Bolsas de Estudo",
  description:
    "Conheça a história e a missão do Unireal, o principal programa de bolsas de estudo para cursos de graduação nas faculdades Unireal e UnirealEAD",
  openGraph: {
    title: "Sobre Nós | Unireal - Bolsas de Estudo",
    description:
      "Conheça a história e a missão do Unireal, o principal programa de bolsas de estudo para cursos de graduação",
    images: [{ url: "/og-image.jpg" }],
  },
}

export default function SobrePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/40 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sobre Nós</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Conheça a história e a missão do Unireal
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Nossa História</h2>
              <p className="text-muted-foreground">
                O Unireal nasceu da visão de um grupo de educadores e profissionais comprometidos com a democratização
                do acesso ao ensino superior de qualidade. Fundado em 2020, o programa surgiu como uma ponte entre
                estudantes em busca de oportunidades educacionais e instituições de ensino que desejavam ampliar o
                acesso aos seus cursos.
              </p>
              <p className="text-muted-foreground">
                Ao longo dos anos, estabelecemos parcerias sólidas com as principais instituições de ensino da região,
                como as faculdades Unireal e UnirealEAD, permitindo oferecer bolsas de estudo com descontos
                significativos em diversos cursos de graduação.
              </p>
              <p className="text-muted-foreground">
                Hoje, o Unireal é reconhecido como um dos principais programas de bolsas de estudo, tendo ajudado
                milhares de estudantes a ingressar no ensino superior e transformar suas vidas através da educação.
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <Image 
                src="/images/campos2.png" 
                alt="Estudantes da Faculdade UnirealEAD" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-muted/40 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Nossa Missão e Valores</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Trabalhamos com o compromisso de transformar vidas através da educação
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Missão</h3>
                <p className="text-muted-foreground">
                  Democratizar o acesso ao ensino superior de qualidade, conectando estudantes a oportunidades de bolsas
                  de estudo que transformem suas vidas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Visão</h3>
                <p className="text-muted-foreground">
                  Ser reconhecido como o principal programa de bolsas de estudo do Brasil, ampliando o acesso à educação
                  superior e contribuindo para o desenvolvimento social.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Valores</h3>
                <p className="text-muted-foreground">
                  Comprometimento com a educação, transparência, ética, responsabilidade social, inovação e excelência
                  no atendimento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Nossos Diferenciais</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                O que torna o Unireal a melhor escolha para quem busca bolsas de estudo
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Bolsas Exclusivas</h3>
                <p className="text-muted-foreground">
                  Oferecemos bolsas com descontos de até 70% em mensalidades, exclusivas para nossos alunos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Instituições Renomadas</h3>
                <p className="text-muted-foreground">
                  Parcerias com as melhores instituições de ensino, como Unireal e UnirealEAD.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Atendimento Personalizado</h3>
                <p className="text-muted-foreground">
                  Equipe dedicada para ajudar você a encontrar a melhor opção para seu futuro acadêmico.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Processo Seguro</h3>
                <p className="text-muted-foreground">
                  Garantimos a segurança dos seus dados e a transparência em todo o processo de inscrição.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m8 14 2 2 6-6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Processo Simplificado</h3>
                <p className="text-muted-foreground">
                  Inscrição rápida e sem burocracia, para que você comece seus estudos o quanto antes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Suporte Contínuo</h3>
                <p className="text-muted-foreground">
                  Acompanhamento durante todo o processo de matrícula e ao longo da sua jornada acadêmica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16 bg-muted/40 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Nossa Equipe</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Conheça os profissionais dedicados que trabalham para oferecer as melhores oportunidades de bolsas de
                estudo
              </p>
            </div>
          </div>

          <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={`/placeholder.svg?height=128&width=128&text=Membro+${i}`}
                    alt={`Membro da equipe ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Nome do Membro {i}</h3>
                  <p className="text-sm text-muted-foreground">Cargo do Membro</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
