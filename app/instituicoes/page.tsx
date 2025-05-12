import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Globe, Mail, BookOpen, Users, Building } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { instituicoes } from "@/data/cursos"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Instituições Parceiras | Unireal - Bolsas de Estudo",
  description:
    "Conheça as instituições parceiras do Unireal que oferecem bolsas de estudo para cursos de graduação com descontos de até 70%",
  openGraph: {
    title: "Instituições Parceiras | Unireal - Bolsas de Estudo",
    description: "Conheça as instituições parceiras do Unireal que oferecem bolsas de estudo para cursos de graduação",
    images: [{ url: "/og-image.jpg" }],
  },
}

export default function InstituicoesPage() {
  // Função para obter a imagem da instituição
  const getInstituicaoImage = (id: string) => {
    if (id === "Unireal-Polo1") return "/images/campos.png"
    if (id === "Unireal-Polo2") return "/images/campos.png"
    if (id === "Unireal-Polo3") return "/images/campos.png"
    if (id === "UnirealEAD") return "/images/campos.png"
    return "/placeholder.svg?height=400&width=350"
  }

  // Função para obter o site da instituição
  const getInstituicaoSite = (id: string) => {
    if (id === "Unireal-Polo1") return "Unireal.com.br"
    if (id === "Unireal-Polo2") return "Polo2.Unireal.com.br"
    if (id === "Unireal-Polo3") return "Polo3.Unireal.com.br"
    if (id === "UnirealEAD") return "UnirealEAD-ro.com.br"
    return ""
  }

  // Função para obter o telefone da instituição
  const getInstituicaoTelefone = (id: string) => {
    if (id === "Unireal-Polo1") return "(69) 3999-9999"
    if (id === "Unireal-Polo2") return "(69) 3999-9999"
    if (id === "Unireal-Polo3") return "(69) 3999-9999"
    if (id === "UnirealEAD") return "(69) 3999-9999"
    return ""
  }

  // Função para obter o email da instituição
  const getInstituicaoEmail = (id: string) => {
    const site = getInstituicaoSite(id)
    return `contato@${site.replace('www.', '')}`
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/40 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nossas Instituições</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Conheça as instituições parceiras que oferecem bolsas de estudo através do Unireal
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="todas" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="Unireal">Unireal</TabsTrigger>
                <TabsTrigger value="UnirealEAD">UnirealEAD</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="todas" className="space-y-8">
              {instituicoes.map((instituicao) => (
                <Card key={instituicao.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[350px_1fr]">
                    <div className="relative h-[200px] md:h-full">
                      <Image
                        src={getInstituicaoImage(instituicao.id) || "/placeholder.svg"}
                        alt={instituicao.nome}
                        fill
                        className="object-cover"
                        priority={true}
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-bold">{instituicao.nome}</h2>
                          <p className="text-muted-foreground">
                            A {instituicao.nome} é uma instituição de ensino superior comprometida com a excelência
                            acadêmica e a formação de profissionais qualificados para o mercado de trabalho.
                          </p>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {instituicao.cidade}, {instituicao.estado}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={`tel:${getInstituicaoTelefone(instituicao.id).replace(/[^0-9]/g, '')}`}
                              className="text-sm hover:text-primary transition-colors"
                            >
                              {getInstituicaoTelefone(instituicao.id)}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={`mailto:${getInstituicaoEmail(instituicao.id)}`}
                              className="text-sm hover:text-primary transition-colors"
                            >
                              {getInstituicaoEmail(instituicao.id)}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={`https://${getInstituicaoSite(instituicao.id)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:text-primary transition-colors"
                            >
                              {getInstituicaoSite(instituicao.id)}
                            </a>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 mt-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="text-sm">+30 cursos</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-sm">+5000 alunos</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-primary" />
                            <span className="text-sm">Infraestrutura moderna</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                          <Button asChild>
                            <Link href={`/bolsas?instituicao=${instituicao.id}`}>Ver bolsas disponíveis</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/instituicoes/${instituicao.id}`}>Conhecer mais</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="Unireal" className="space-y-8">
              {instituicoes
                .filter((i) => i.id.includes("Unireal"))
                .map((instituicao) => (
                  <Card key={instituicao.id} className="overflow-hidden">
                    <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[350px_1fr]">
                      <div className="relative h-[200px] md:h-full">
                        <Image
                          src={getInstituicaoImage(instituicao.id) || "/placeholder.svg"}
                          alt={instituicao.nome}
                          fill
                          className="object-cover"
                          priority={true}
                          quality={85}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h2 className="text-2xl font-bold">{instituicao.nome}</h2>
                            <p className="text-muted-foreground">
                              A {instituicao.nome} é uma instituição de ensino superior comprometida com a excelência
                              acadêmica e a formação de profissionais qualificados para o mercado de trabalho.
                            </p>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {instituicao.cidade}, {instituicao.estado}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a 
                                href={`tel:${getInstituicaoTelefone(instituicao.id).replace(/[^0-9]/g, '')}`}
                                className="text-sm hover:text-primary transition-colors"
                              >
                                {getInstituicaoTelefone(instituicao.id)}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a 
                                href={`mailto:${getInstituicaoEmail(instituicao.id)}`}
                                className="text-sm hover:text-primary transition-colors"
                              >
                                {getInstituicaoEmail(instituicao.id)}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a 
                                href={`https://${getInstituicaoSite(instituicao.id)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-primary transition-colors"
                              >
                                {getInstituicaoSite(instituicao.id)}
                              </a>
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-3 mt-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="text-sm">+30 cursos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span className="text-sm">+5000 alunos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-primary" />
                              <span className="text-sm">Infraestrutura moderna</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <Button asChild>
                              <Link href={`/bolsas?instituicao=${instituicao.id}`}>Ver bolsas disponíveis</Link>
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href={`/instituicoes/${instituicao.id}`}>Conhecer mais</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="UnirealEAD" className="space-y-8">
              {instituicoes
                .filter((i) => i.id === "UnirealEAD")
                .map((instituicao) => (
                  <Card key={instituicao.id} className="overflow-hidden">
                    <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[350px_1fr]">
                      <div className="relative h-[200px] md:h-full">
                        <Image
                          src={getInstituicaoImage(instituicao.id) || "/placeholder.svg"}
                          alt={instituicao.nome}
                          fill
                          className="object-cover"
                          priority={true}
                          quality={85}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h2 className="text-2xl font-bold">{instituicao.nome}</h2>
                            <p className="text-muted-foreground">
                              A {instituicao.nome} é uma instituição de ensino superior comprometida com a excelência
                              acadêmica e a formação de profissionais qualificados para o mercado de trabalho.
                            </p>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                {instituicao.cidade}, {instituicao.estado}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a 
                                href={`tel:${getInstituicaoTelefone(instituicao.id).replace(/[^0-9]/g, '')}`}
                                className="text-sm hover:text-primary transition-colors"
                              >
                                {getInstituicaoTelefone(instituicao.id)}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a 
                                href={`mailto:${getInstituicaoEmail(instituicao.id)}`}
                                className="text-sm hover:text-primary transition-colors"
                              >
                                {getInstituicaoEmail(instituicao.id)}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <a 
                                href={`https://${getInstituicaoSite(instituicao.id)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm hover:text-primary transition-colors"
                              >
                                {getInstituicaoSite(instituicao.id)}
                              </a>
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-3 mt-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="text-sm">+30 cursos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span className="text-sm">+5000 alunos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-primary" />
                              <span className="text-sm">Infraestrutura moderna</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <Button asChild>
                              <Link href={`/bolsas?instituicao=${instituicao.id}`}>Ver bolsas disponíveis</Link>
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href={`/instituicoes/${instituicao.id}`}>Conhecer mais</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}
