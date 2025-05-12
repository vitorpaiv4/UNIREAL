import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, MapPin, Calendar, Clock, GraduationCap, CheckCircle2 } from "lucide-react"
import { cursos, instituicoes } from "@/data/cursos"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { InstitutionMap } from "@/components/institution-map"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const curso = cursos.find((c) => c.id === params.id)

  if (!curso) {
    return {
      title: "Curso não encontrado | Unireal",
      description: "O curso que você está procurando não foi encontrado.",
    }
  }

  return {
    title: `${curso.nome} | ${curso.instituicao} | Unireal`,
    description: `Bolsa de ${curso.desconto}% para o curso de ${curso.nome} na ${curso.instituicao}. Economize R$ ${curso.economiaSemestre.toFixed(2)} por semestre.`,
    openGraph: {
      title: `${curso.nome} | ${curso.instituicao} | Unireal`,
      description: `Bolsa de ${curso.desconto}% para o curso de ${curso.nome} na ${curso.instituicao}. Economize R$ ${curso.economiaSemestre.toFixed(2)} por semestre.`,
      images: [{ url: "/og-image.jpg" }],
    },
  }
}

export default function CursoPage({ params }: { params: { id: string } }) {
  const curso = cursos.find((c) => c.id === params.id)

  if (!curso) {
    notFound()
  }

  const instituicao = instituicoes.find((i) => i.nome === curso.instituicao)

  // Função para obter a imagem do curso com base no ID ou nome
  const getCursoImage = () => {
    // Verificar se é um curso de Medicina Veterinária
    if (curso.id.includes("medicina-veterinaria") || curso.nome.includes("MEDICINA VETERINÁRIA")) {
      return "/images/cursos/veterinario.jpg"
    }
    // Verificar se é um curso de Direito
    else if (curso.id.includes("direito") || curso.nome.includes("DIREITO")) {
      return "/images/cursos/direito.jpg"
    }
    // Verificar se é um curso de Biomedicina
    else if (curso.id.includes("biomedicina") || curso.nome.includes("BIOMEDICINA")) {
      return "/images/cursos/biomedicina.jpg"
    }
    // Verificar se é um curso de Odontologia
    else if (curso.id.includes("odontologia") || curso.nome.includes("ODONTOLOGIA")) {
      return "/images/cursos/dentista.jpg"
    }
    // Placeholder para outros cursos - usando um placeholder menor e mais leve
    return "/placeholder.svg?height=300&width=400&text=Curso"
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/40 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Link href="/bolsas" className="text-sm text-muted-foreground hover:text-primary">
                  Bolsas
                </Link>
                <span className="text-sm text-muted-foreground">/</span>
                <span className="text-sm font-medium">{curso.nome}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{curso.nome}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{curso.instituicao}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{curso.avaliacao.toFixed(1)}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    className="text-yellow-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-sm text-muted-foreground">Excelente</span>
                </div>
                <Badge variant="outline" className="rounded-sm">
                  {curso.modalidade}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center space-y-4 lg:items-end">
              <div className="rounded-lg bg-green-500 px-3 py-1 text-sm font-medium text-white">
                Bolsa de {curso.desconto}%
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Mensalidade:</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm line-through text-muted-foreground">
                    R$ {curso.mensalidade.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-3xl font-bold text-green-600 dark:text-green-500">
                    R$ {curso.mensalidadeComDesconto.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Economia semestre:{" "}
                  <span className="font-medium text-green-600 dark:text-green-500">
                    R$ {curso.economiaSemestre.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="lg" asChild>
                  <Link href={`/bolsas/${curso.id}/escolher`}>Escolha esta bolsa</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Comparar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="detalhes" className="w-full">
            <TabsList className="w-full justify-start mb-8 overflow-auto">
              <TabsTrigger value="detalhes">Detalhes do Curso</TabsTrigger>
              <TabsTrigger value="instituicao">Sobre a Instituição</TabsTrigger>
              <TabsTrigger value="bolsa">Detalhes da Bolsa</TabsTrigger>
            </TabsList>

            <TabsContent value="detalhes" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Sobre o Curso</h2>
                  <p className="text-muted-foreground">
                    O curso de {curso.nome} da {curso.instituicao} é reconhecido pela sua excelência acadêmica e
                    formação completa. Com um corpo docente altamente qualificado e infraestrutura moderna, o curso
                    prepara profissionais capacitados para atuar no mercado de trabalho com competência e ética.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Duração</div>
                          <div className="text-sm text-muted-foreground">5 anos (10 semestres)</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Turno</div>
                          <div className="text-sm text-muted-foreground">Matutino e Noturno</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Grau</div>
                          <div className="text-sm text-muted-foreground">Bacharelado</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Modalidade</div>
                          <div className="text-sm text-muted-foreground">{curso.modalidade}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="relative h-[300px] md:h-full overflow-hidden rounded-lg">
                  <Image
                    src={getCursoImage() || "/placeholder.svg"}
                    alt={curso.nome}
                    fill
                    className="object-cover"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Matriz Curricular</h3>
                <p className="text-muted-foreground">
                  A matriz curricular do curso de {curso.nome} foi desenvolvida para proporcionar uma formação completa,
                  combinando teoria e prática. Conheça algumas das disciplinas que você irá estudar:
                </p>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Disciplina Exemplo {i}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline">Ver matriz curricular completa</Button>
              </div>
            </TabsContent>

            <TabsContent value="instituicao" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Sobre a {curso.instituicao}</h2>
                  <p className="text-muted-foreground">
                    A {curso.instituicao} é uma instituição de ensino superior comprometida com a excelência acadêmica e
                    a formação de profissionais qualificados. Com infraestrutura moderna e corpo docente altamente
                    qualificado, a instituição oferece uma experiência educacional completa e de qualidade.
                  </p>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Diferenciais</h3>
                    <div className="grid gap-2">
                      {[
                        "Infraestrutura moderna e completa",
                        "Corpo docente qualificado",
                        "Laboratórios equipados",
                        "Biblioteca com amplo acervo",
                        "Programas de iniciação científica",
                        "Parcerias com empresas para estágios",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative h-[300px] md:h-full overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt={curso.instituicao}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Localização</h3>
                <div className="aspect-video overflow-hidden rounded-lg">
                  {instituicao && (
                    <InstitutionMap
                      instituicao={instituicao.nome}
                      cidade={instituicao.cidade}
                      estado={instituicao.estado}
                    />
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bolsa" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Detalhes da Bolsa</h2>
                  <p className="text-muted-foreground">
                    A bolsa de {curso.desconto}% para o curso de {curso.nome} na {curso.instituicao} é uma excelente
                    oportunidade para iniciar sua formação acadêmica com um desconto significativo. Confira abaixo os
                    detalhes e condições para manter a bolsa durante todo o curso.
                  </p>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">Valores</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground">Mensalidade original:</div>
                              <div className="font-medium">R$ {curso.mensalidade.toFixed(2).replace(".", ",")}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Mensalidade com desconto:</div>
                              <div className="font-medium text-green-600">
                                R$ {curso.mensalidadeComDesconto.toFixed(2).replace(".", ",")}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Economia por semestre:</div>
                              <div className="font-medium text-green-600">
                                R$ {curso.economiaSemestre.toFixed(2).replace(".", ",")}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Percentual de desconto:</div>
                              <div className="font-medium text-green-600">{curso.desconto}%</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <h3 className="font-medium">Requisitos para manutenção da bolsa</h3>
                      <div className="space-y-2">
                        {[
                          "Pagamento das mensalidades até o dia 5 de cada mês",
                          "Frequência mínima de 75% nas aulas",
                          "Aprovação em todas as disciplinas",
                          "Não trancar ou cancelar a matrícula",
                        ].map((req, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Como se inscrever</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      O processo de inscrição para a bolsa de estudos é simples e rápido. Siga os passos abaixo:
                    </p>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li className="pl-2">Clique no botão "Escolha esta bolsa"</li>
                      <li className="pl-2">Preencha o formulário com seus dados pessoais</li>
                      <li className="pl-2">Envie os documentos solicitados</li>
                      <li className="pl-2">Aguarde o contato da nossa equipe</li>
                      <li className="pl-2">Realize a matrícula na instituição</li>
                    </ol>
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="font-medium">Documentos necessários:</h4>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>• Documento de identidade (RG)</li>
                        <li>• CPF</li>
                        <li>• Comprovante de residência</li>
                        <li>• Certificado de conclusão do ensino médio</li>
                        <li>• Histórico escolar do ensino médio</li>
                      </ul>
                    </div>
                    <Button size="lg" className="w-full" asChild>
                      <Link href={`/bolsas/${curso.id}/escolher`}>Escolha esta bolsa</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}
