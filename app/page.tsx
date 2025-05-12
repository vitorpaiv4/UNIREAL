import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap } from "lucide-react"
import Link from "next/link"
import { cursos } from "@/data/cursos"
import { CourseCard } from "@/components/course-card"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { AnimatedSection } from "@/components/animated-section"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Unireal - Bolsas de Estudo para Faculdades Unireal e UnirealEAD",
  description:
    "Encontre as melhores bolsas de estudo para cursos de graduação nas faculdades Unireal e UnirealEAD com descontos de até 70%",
  keywords: ["bolsas de estudo", "faculdade", "Unireal", "UnirealEAD", "graduação", "descontos", "educação superior"],
  openGraph: {
    title: "Unireal - Bolsas de Estudo para Faculdades",
    description: "Encontre as melhores bolsas de estudo para cursos de graduação com descontos de até 70%",
    images: [{ url: "iconee.png" }],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="w-full relative min-h-[600px] flex items-center">
        {/* Background Image */}
        <Image
          src="/images/campos2.png"
          alt="Unireal Polo1 Campus"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-transparent"></div>
        
        <div className="container relative px-4 py-16 md:py-24 lg:py-32 z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                  Faculdade{" "}
                  <span className="inline-flex">
                    <span className="text-[#F7941D] opacity-0 animate-[appear_0.2s_0.1s_forwards] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">U</span>
                    <span className="text-[#F7941D] opacity-0 animate-[appear_0.2s_0.2s_forwards] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">N</span>
                    <span className="text-[#F7941D] opacity-0 animate-[appear_0.2s_0.3s_forwards] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">I</span>
                    <span className="text-[#F7941D] opacity-0 animate-[appear_0.2s_0.5s_forwards] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">R</span>
                    <span className="text-[#F7941D] opacity-0 animate-[appear_0.2s_0.6s_forwards] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">E</span>
                    <span className="text-[#F7941D] opacity-0 animate-[appear_0.2s_0.7s_forwards] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">A</span>
                    <span className="text-[#F7941D] opacity-0 animate-[appear_0.2s_0.8s_forwards] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">L</span>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-white">Seu futuro acadêmico começa aqui</p>
                <p className="max-w-[600px] text-white/90 md:text-xl">
                  Descontos de até 70% em mensalidades para diversos cursos superiores
                </p>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Link href="/bolsas">
                  <Button className="w-full sm:w-auto">
                    Ver bolsas disponíveis
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button
                    className="outline w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30"
                  >
                    Fale conosco
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-4 bg-black/30 p-6 rounded-lg backdrop-blur-sm border border-white/10">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-white">Encontre sua bolsa ideal</h2>
                  <p className="text-sm text-white/80">
                    Busque por curso, instituição ou cidade e comece sua jornada acadêmica
                  </p>
                </div>
                <div className="bg-white/10 border-white/20 rounded-md border">
                  <SearchAutocomplete placeholder="Digite curso, instituição ou cidade..." variant="hero" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 dark:bg-background" delay={0}>
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Encontre bolsas de estudo para cursos de graduação
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ajudamos estudantes a encontrar as melhores oportunidades de bolsas de estudo em instituições de
                  ensino de qualidade.
                </p>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                <Link href="/bolsas">
                  <Button className="w-full md:w-auto text-lg">
                    Ver todas as bolsas
                  </Button>
                </Link>
                <Link href="/sobre">
                  <Button className="w-full md:w-auto text-lg">
                    Sobre nós
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-4 lg:max-w-none">
              <div className="relative h-[300px] overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center p-6">
                  <div className="text-center text-white space-y-4">
                    <GraduationCap className="h-16 w-16 mx-auto text-white" />
                    <h3 className="text-2xl font-bold">Comece sua jornada acadêmica</h3>
                    <p className="text-white/90">
                      Descubra bolsas de estudo com até 70% de desconto e transforme seu futuro
                    </p>
                    <Button className="btn-secondary" asChild>
                      <Link href="/bolsas">Explorar bolsas</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="w-full py-12 md:py-24 lg:py-32" delay={1}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Bolsas Disponíveis 2025/2
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Cursos em Destaque</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Confira as melhores oportunidades de bolsas de estudo disponíveis para você
              </p>
            </div>
          </div>

          <Tabs defaultValue="todos" className="mt-8">
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="todos">Todos os Cursos</TabsTrigger>
                <TabsTrigger value="Unireal">Unireal</TabsTrigger>
                <TabsTrigger value="UnirealEAD">UnirealEAD</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="todos" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cursos.slice(0, 6).map((curso, index) => (
                  <CourseCard key={curso.id} curso={curso} index={index} />
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <Link href="/bolsas">
                  <Button className="text-lg">Ver todos os cursos</Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="Unireal" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cursos
                  .filter((c) => c.instituicao.includes("Unireal"))
                  .slice(0, 6)
                  .map((curso, index) => (
                    <CourseCard key={curso.id} curso={curso} index={index} />
                  ))}
              </div>
              <div className="mt-10 flex justify-center">
                <Link href="/bolsas?instituicao=Unireal">
                  <Button className="text-lg">Ver todos os cursos Unireal</Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="UnirealEAD" className="mt-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cursos
                  .filter((c) => c.instituicao === "UnirealEAD")
                  .slice(0, 6)
                  .map((curso, index) => (
                    <CourseCard key={curso.id} curso={curso} index={index} />
                  ))}
              </div>
              <div className="mt-10 flex justify-center">
                <Link href="/bolsas?instituicao=UnirealEAD">
                  <Button className="text-lg">Ver todos os cursos UnirealEAD</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedSection>

      <AnimatedSection className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 dark:bg-muted/10" delay={2}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Por que escolher o Unireal?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Somos especialistas em conectar estudantes às melhores oportunidades de bolsas de estudo
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="bg-background rounded-lg p-6 shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Processo Simplificado</h3>
              <p className="text-muted-foreground">
                Inscreva-se em poucos passos, sem burocracia e com resultados rápidos.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Atendimento Personalizado</h3>
              <p className="text-muted-foreground">
                Equipe dedicada para ajudar você a encontrar a melhor opção para seu futuro.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Descontos Exclusivos</h3>
              <p className="text-muted-foreground">
                Bolsas de até 70% em mensalidades para diversos cursos superiores.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  )
}
