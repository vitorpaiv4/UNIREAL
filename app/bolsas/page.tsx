"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, X } from "lucide-react"
import { CourseCard } from "@/components/course-card"
import { cursos, instituicoes } from "@/data/cursos"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { SearchAutocomplete } from "@/components/search-autocomplete"
import { AnimatedSection } from "@/components/animated-section"
import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import dynamic from "next/dynamic"
import { useDebounce } from "../hooks/use-debounce"

// Importar componentes de forma dinâmica para melhorar a performance
const DynamicAnimatedSection = dynamic(
  () => import("@/components/animated-section").then((mod) => mod.AnimatedSection),
  {
    ssr: false,
    loading: () => <div className="w-full py-12 md:py-16 lg:py-20 bg-muted/40 dark:bg-muted/10"></div>,
  },
)

export default function BolsasPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Estado para os filtros
  const [instituicaoFilter, setInstituicaoFilter] = useState<string[]>([])
  const [modalidadeFilter, setModalidadeFilter] = useState<string[]>([])
  const [descontoFilter, setDescontoFilter] = useState<number>(20)
  const [mensalidadeFilter, setMensalidadeFilter] = useState<number>(3000)
  const [cidadeFilter, setCidadeFilter] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("todos")
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const debouncedDescontoFilter = useDebounce(descontoFilter, 300)
  const debouncedMensalidadeFilter = useDebounce(mensalidadeFilter, 300)

  // Extrair cidades únicas
  const cidades = useMemo(() => {
    const cidadesUnicas = new Set(instituicoes.map((i) => i.cidade))
    return Array.from(cidadesUnicas)
  }, [])

  // Aplicar filtros dos parâmetros de URL na inicialização
  useEffect(() => {
    const q = searchParams.get("q")
    const inst = searchParams.get("instituicao")
    const mod = searchParams.get("modalidade")
    const desc = searchParams.get("desconto")
    const mens = searchParams.get("mensalidade")
    const cid = searchParams.get("cidade")

    // Definir searchQuery
    setSearchQuery(q || "")

    // Definir instituicaoFilter
    if (inst) {
      const instArray = inst.split(",")
      setInstituicaoFilter(instArray)

      // Atualizar a aba ativa com base na instituição
      if (instArray.some((i) => i.includes("Unireal"))) {
        setActiveTab("Unireal")
      } else if (instArray.includes("UnirealEAD")) {
        setActiveTab("UnirealEAD")
      }
    } else {
      setInstituicaoFilter([])
    }

    // Definir modalidadeFilter
    if (mod) {
      setModalidadeFilter(mod.split(","))
    } else {
      setModalidadeFilter([])
    }

    // Definir descontoFilter
    if (desc) {
      setDescontoFilter(Number(desc))
    } else {
      setDescontoFilter(20)
    }

    // Definir mensalidadeFilter
    if (mens) {
      setMensalidadeFilter(Number(mens))
    } else {
      setMensalidadeFilter(3000)
    }

    // Definir cidadeFilter
    if (cid) {
      setCidadeFilter(cid.split(","))
    } else {
      setCidadeFilter([])
    }

    // Simular carregamento concluído após um curto período
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }, [searchParams])

  // Filtrar cursos com base nos filtros selecionados - memoizado para melhor performance
  const filteredCursos = useMemo(() => {
    return cursos.filter((curso) => {
      // Filtro por pesquisa
      if (debouncedSearchQuery) {
        const query = debouncedSearchQuery.toLowerCase()
        const matchesNome = curso.nome.toLowerCase().includes(query)
        const matchesInstituicao = curso.instituicao.toLowerCase().includes(query)

        if (!matchesNome && !matchesInstituicao) {
          return false
        }
      }

      // Filtro por instituição
      if (instituicaoFilter.length > 0) {
        const matchesInstituicao = instituicaoFilter.some(
          (i) => curso.instituicao.includes(i) || (i === "Unireal" && curso.instituicao.includes("Unireal")),
        )

        if (!matchesInstituicao) {
          return false
        }
      }

      // Filtro por modalidade
      if (modalidadeFilter.length > 0 && !modalidadeFilter.includes(curso.modalidade)) {
        return false
      }

      // Filtro por desconto
      if (curso.desconto < debouncedDescontoFilter) {
        return false
      }

      // Filtro por mensalidade
      if (curso.mensalidadeComDesconto > debouncedMensalidadeFilter) {
        return false
      }

      // Filtro por cidade
      if (cidadeFilter.length > 0) {
        const instituicao = instituicoes.find((i) => i.nome === curso.instituicao)
        if (!instituicao || !cidadeFilter.includes(instituicao.cidade)) {
          return false
        }
      }

      return true
    })
  }, [
    debouncedSearchQuery,
    instituicaoFilter,
    modalidadeFilter,
    debouncedDescontoFilter,
    debouncedMensalidadeFilter,
    cidadeFilter,
  ])

  // Atualizar a URL com os filtros
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams()

    if (searchQuery) params.set("q", searchQuery)
    if (instituicaoFilter.length > 0) params.set("instituicao", instituicaoFilter.join(","))
    if (modalidadeFilter.length > 0) params.set("modalidade", modalidadeFilter.join(","))
    if (descontoFilter !== 20) params.set("desconto", descontoFilter.toString())
    if (mensalidadeFilter !== 3000) params.set("mensalidade", mensalidadeFilter.toString())
    if (cidadeFilter.length > 0) params.set("cidade", cidadeFilter.join(","))

    router.push(`/bolsas?${params.toString()}`, { scroll: false })
    setIsFilterSheetOpen(false)
  }

  // Limpar todos os filtros
  const clearAllFilters = () => {
    setSearchQuery("")
    setInstituicaoFilter([])
    setModalidadeFilter([])
    setDescontoFilter(20)
    setMensalidadeFilter(3000)
    setCidadeFilter([])
    setActiveTab("todos")
    router.push("/bolsas", { scroll: false })
  }

  // Manipular mudança de aba
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    let newInstituicaoFilter: string[] = []

    if (value === "Unireal") {
      newInstituicaoFilter = ["Unireal Polo1", "Unireal Polo2", "Unireal Polo3"]
    } else if (value === "UnirealEAD") {
      newInstituicaoFilter = ["UnirealEAD"]
    }

    setInstituicaoFilter(newInstituicaoFilter)

    // Atualizar URL com os novos filtros
    const params = new URLSearchParams(searchParams.toString())

    if (newInstituicaoFilter.length > 0) {
      params.set("instituicao", newInstituicaoFilter.join(","))
    } else {
      params.delete("instituicao")
    }

    router.push(`/bolsas?${params.toString()}`, { scroll: false })
  }

  // Verificar se há filtros ativos
  const hasActiveFilters =
    searchQuery !== "" ||
    instituicaoFilter.length > 0 ||
    modalidadeFilter.length > 0 ||
    descontoFilter !== 20 ||
    mensalidadeFilter !== 3000 ||
    cidadeFilter.length > 0

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <DynamicAnimatedSection className="w-full py-12 md:py-16 lg:py-20 bg-muted/40 dark:bg-muted/10" delay={0}>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bolsas Disponíveis</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Encontre as melhores oportunidades de bolsas de estudo
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    <div className="grid gap-2">
                      <SearchAutocomplete
                        placeholder="Digite o nome do curso, instituição ou cidade"
                        onSearch={(query) => setSearchQuery(query)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Select
                        value={instituicaoFilter.length === 1 ? instituicaoFilter[0] : ""}
                        onValueChange={(value) => {
                          if (value === "todas") {
                            setInstituicaoFilter([])
                          } else {
                            setInstituicaoFilter([value])
                          }
                        }}
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Instituição" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todas">Todas</SelectItem>
                          <SelectItem value="Unireal Polo1">Unireal Polo1</SelectItem>
                          <SelectItem value="Unireal Polo2">Unireal Polo2</SelectItem>
                          <SelectItem value="Unireal Polo3">Unireal Polo3</SelectItem>
                          <SelectItem value="UnirealEAD">UnirealEAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DynamicAnimatedSection>

      <AnimatedSection className="w-full py-12 md:py-16" delay={1}>
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Filtros para desktop */}
            <div className="hidden lg:block space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2">
                      <X className="h-4 w-4 mr-1" />
                      Limpar
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Instituição</h4>
                    <div className="space-y-2">
                      {["Unireal Polo1", "Unireal Polo2", "Unireal Polo3", "UnirealEAD"].map((inst) => (
                        <div key={inst} className="flex items-center space-x-2">
                          <Checkbox
                            id={`inst-${inst}`}
                            checked={instituicaoFilter.includes(inst)}
                            onCheckedChange={(checked) => {
                              let newFilter = [...instituicaoFilter]
                              if (checked) {
                                newFilter.push(inst)
                              } else {
                                newFilter = newFilter.filter((i) => i !== inst)
                              }
                              setInstituicaoFilter(newFilter)

                              // Atualizar URL
                              const params = new URLSearchParams(searchParams.toString())
                              if (newFilter.length > 0) {
                                params.set("instituicao", newFilter.join(","))
                              } else {
                                params.delete("instituicao")
                              }
                              router.push(`/bolsas?${params.toString()}`, { scroll: false })
                            }}
                          />
                          <Label htmlFor={`inst-${inst}`} className="text-sm font-normal">
                            {inst}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Modalidade</h4>
                    <div className="space-y-2">
                      {["Presencial", "EAD", "Híbrido"].map((mod) => (
                        <div key={mod} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mod-${mod}`}
                            checked={modalidadeFilter.includes(mod)}
                            onCheckedChange={(checked) => {
                              let newFilter = [...modalidadeFilter]
                              if (checked) {
                                newFilter.push(mod)
                              } else {
                                newFilter = newFilter.filter((i) => i !== mod)
                              }
                              setModalidadeFilter(newFilter)

                              // Atualizar URL
                              const params = new URLSearchParams(searchParams.toString())
                              if (newFilter.length > 0) {
                                params.set("modalidade", newFilter.join(","))
                              } else {
                                params.delete("modalidade")
                              }
                              router.push(`/bolsas?${params.toString()}`, { scroll: false })
                            }}
                          />
                          <Label htmlFor={`mod-${mod}`} className="text-sm font-normal">
                            {mod}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Cidade</h4>
                    <div className="space-y-2">
                      {cidades.map((cidade) => (
                        <div key={cidade} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cidade-${cidade}`}
                            checked={cidadeFilter.includes(cidade)}
                            onCheckedChange={(checked) => {
                              let newFilter = [...cidadeFilter]
                              if (checked) {
                                newFilter.push(cidade)
                              } else {
                                newFilter = newFilter.filter((c) => c !== cidade)
                              }
                              setCidadeFilter(newFilter)

                              // Atualizar URL
                              const params = new URLSearchParams(searchParams.toString())
                              if (newFilter.length > 0) {
                                params.set("cidade", newFilter.join(","))
                              } else {
                                params.delete("cidade")
                              }
                              router.push(`/bolsas?${params.toString()}`, { scroll: false })
                            }}
                          />
                          <Label htmlFor={`cidade-${cidade}`} className="text-sm font-normal">
                            {cidade}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Percentual de Bolsa</h4>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Slider
                          value={[descontoFilter]}
                          min={20}
                          max={70}
                          step={5}
                          onValueChange={(value) => setDescontoFilter(value[0])}
                          onValueCommit={(value) => {
                            setDescontoFilter(value[0])

                            // Atualizar URL
                            const params = new URLSearchParams(searchParams.toString())
                            if (value[0] !== 20) {
                              params.set("desconto", value[0].toString())
                            } else {
                              params.delete("desconto")
                            }
                            router.push(`/bolsas?${params.toString()}`, { scroll: false })
                          }}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Mínimo: 20%</span>
                          <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                            {descontoFilter}%
                          </span>
                          <span className="text-sm">Máximo: 70%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Valor da Mensalidade</h4>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Slider
                          value={[mensalidadeFilter]}
                          min={400}
                          max={3000}
                          step={100}
                          onValueChange={(value) => setMensalidadeFilter(value[0])}
                          onValueCommit={(value) => {
                            setMensalidadeFilter(value[0])

                            // Atualizar URL
                            const params = new URLSearchParams(searchParams.toString())
                            if (value[0] !== 3000) {
                              params.set("mensalidade", value[0].toString())
                            } else {
                              params.delete("mensalidade")
                            }
                            router.push(`/bolsas?${params.toString()}`, { scroll: false })
                          }}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">R$ 400</span>
                          <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                            R$ {mensalidadeFilter}
                          </span>
                          <span className="text-sm">R$ 3000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" type="button" onClick={updateUrlWithFilters}>
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Resultados</h2>
                  <p className="text-sm text-muted-foreground">
                    {isLoading ? "Carregando..." : `Mostrando ${filteredCursos.length} bolsas disponíveis`}
                  </p>
                </div>
                <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                      {hasActiveFilters && (
                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                          {instituicaoFilter.length +
                            modalidadeFilter.length +
                            cidadeFilter.length +
                            (descontoFilter !== 20 ? 1 : 0) +
                            (mensalidadeFilter !== 3000 ? 1 : 0)}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="space-y-6 py-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Filtros</h3>
                        {hasActiveFilters && (
                          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2">
                            <X className="h-4 w-4 mr-1" />
                            Limpar
                          </Button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Instituição</h4>
                          <div className="space-y-2">
                            {["Unireal Polo1", "Unireal Polo2", "Unireal Polo3", "UnirealEAD"].map((inst) => (
                              <div key={inst} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-inst-${inst}`}
                                  checked={instituicaoFilter.includes(inst)}
                                  onCheckedChange={(checked) => {
                                    let newFilter = [...instituicaoFilter]
                                    if (checked) {
                                      newFilter.push(inst)
                                    } else {
                                      newFilter = newFilter.filter((i) => i !== inst)
                                    }
                                    setInstituicaoFilter(newFilter)

                                    // Atualizar URL
                                    const params = new URLSearchParams(searchParams.toString())
                                    if (newFilter.length > 0) {
                                      params.set("instituicao", newFilter.join(","))
                                    } else {
                                      params.delete("instituicao")
                                    }
                                    router.push(`/bolsas?${params.toString()}`, { scroll: false })
                                  }}
                                />
                                <Label htmlFor={`mobile-inst-${inst}`} className="text-sm font-normal">
                                  {inst}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <h4 className="font-medium">Modalidade</h4>
                          <div className="space-y-2">
                            {["Presencial", "EAD", "Híbrido"].map((mod) => (
                              <div key={mod} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-mod-${mod}`}
                                  checked={modalidadeFilter.includes(mod)}
                                  onCheckedChange={(checked) => {
                                    let newFilter = [...modalidadeFilter]
                                    if (checked) {
                                      newFilter.push(mod)
                                    } else {
                                      newFilter = newFilter.filter((i) => i !== mod)
                                    }
                                    setModalidadeFilter(newFilter)

                                    // Atualizar URL
                                    const params = new URLSearchParams(searchParams.toString())
                                    if (newFilter.length > 0) {
                                      params.set("modalidade", newFilter.join(","))
                                    } else {
                                      params.delete("modalidade")
                                    }
                                    router.push(`/bolsas?${params.toString()}`, { scroll: false })
                                  }}
                                />
                                <Label htmlFor={`mobile-mod-${mod}`} className="text-sm font-normal">
                                  {mod}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <h4 className="font-medium">Cidade</h4>
                          <div className="space-y-2">
                            {cidades.map((cidade) => (
                              <div key={cidade} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-cidade-${cidade}`}
                                  checked={cidadeFilter.includes(cidade)}
                                  onCheckedChange={(checked) => {
                                    let newFilter = [...cidadeFilter]
                                    if (checked) {
                                      newFilter.push(cidade)
                                    } else {
                                      newFilter = newFilter.filter((c) => c !== cidade)
                                    }
                                    setCidadeFilter(newFilter)

                                    // Atualizar URL
                                    const params = new URLSearchParams(searchParams.toString())
                                    if (newFilter.length > 0) {
                                      params.set("cidade", newFilter.join(","))
                                    } else {
                                      params.delete("cidade")
                                    }
                                    router.push(`/bolsas?${params.toString()}`, { scroll: false })
                                  }}
                                />
                                <Label htmlFor={`mobile-cidade-${cidade}`} className="text-sm font-normal">
                                  {cidade}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <h4 className="font-medium">Percentual de Bolsa</h4>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Slider
                                value={[descontoFilter]}
                                min={20}
                                max={70}
                                step={5}
                                onValueChange={(value) => setDescontoFilter(value[0])}
                                onValueCommit={(value) => {
                                  setDescontoFilter(value[0])

                                  // Atualizar URL
                                  const params = new URLSearchParams(searchParams.toString())
                                  if (value[0] !== 20) {
                                    params.set("desconto", value[0].toString())
                                  } else {
                                    params.delete("desconto")
                                  }
                                  router.push(`/bolsas?${params.toString()}`, { scroll: false })
                                }}
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Mínimo: 20%</span>
                                <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                                  {descontoFilter}%
                                </span>
                                <span className="text-sm">Máximo: 70%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <h4 className="font-medium">Valor da Mensalidade</h4>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Slider
                                value={[mensalidadeFilter]}
                                min={400}
                                max={3000}
                                step={100}
                                onValueChange={(value) => setMensalidadeFilter(value[0])}
                                onValueCommit={(value) => {
                                  setMensalidadeFilter(value[0])

                                  // Atualizar URL
                                  const params = new URLSearchParams(searchParams.toString())
                                  if (value[0] !== 3000) {
                                    params.set("mensalidade", value[0].toString())
                                  } else {
                                    params.delete("mensalidade")
                                  }
                                  router.push(`/bolsas?${params.toString()}`, { scroll: false })
                                }}
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-sm">R$ 400</span>
                                <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
                                  R$ {mensalidadeFilter}
                                </span>
                                <span className="text-sm">R$ 3000</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full" type="button" onClick={updateUrlWithFilters}>
                          Aplicar Filtros
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Exibir filtros ativos */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {searchQuery && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Busca: {searchQuery}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                    </Badge>
                  )}
                  {instituicaoFilter.map((inst) => (
                    <Badge key={inst} variant="secondary" className="flex items-center gap-1">
                      {inst}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setInstituicaoFilter(instituicaoFilter.filter((i) => i !== inst))}
                      />
                    </Badge>
                  ))}
                  {modalidadeFilter.map((mod) => (
                    <Badge key={mod} variant="secondary" className="flex items-center gap-1">
                      {mod}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setModalidadeFilter(modalidadeFilter.filter((m) => m !== mod))}
                      />
                    </Badge>
                  ))}
                  {cidadeFilter.map((cidade) => (
                    <Badge key={cidade} variant="secondary" className="flex items-center gap-1">
                      {cidade}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setCidadeFilter(cidadeFilter.filter((c) => c !== cidade))}
                      />
                    </Badge>
                  ))}
                  {descontoFilter !== 20 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Desconto: {descontoFilter}%+
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setDescontoFilter(20)} />
                    </Badge>
                  )}
                  {mensalidadeFilter !== 3000 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Até R$ {mensalidadeFilter}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setMensalidadeFilter(3000)} />
                    </Badge>
                  )}
                </div>
              )}

              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-6">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="Unireal">Unireal</TabsTrigger>
                  <TabsTrigger value="UnirealEAD">UnirealEAD</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  {isLoading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg"></div>
                      ))}
                    </div>
                  ) : filteredCursos.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredCursos.map((curso, index) => (
                        <CourseCard key={curso.id} curso={curso} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Nenhum curso encontrado com os filtros selecionados.</p>
                      <Button variant="outline" className="mt-4" onClick={clearAllFilters}>
                        Limpar filtros
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {filteredCursos.length > 12 && !isLoading && (
                <div className="flex justify-center">
                  <Button variant="outline" type="button">
                    Carregar mais
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
    </main>
  )
}
