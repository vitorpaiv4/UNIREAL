"use client"

import * as React from "react"
import { Search, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { cursos, instituicoes } from "@/data/cursos"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

interface SearchResult {
  id: string
  nome: string
  tipo: "curso" | "instituicao" | "cidade"
  subtitulo?: string
  prioridade: number
}

interface SearchAutocompleteProps {
  placeholder?: string
  className?: string
  variant?: "default" | "hero"
  onSearch?: (query: string) => void
}

// Mapeamento de abreviações para nomes completos de cidades
const cityAbbreviations: Record<string, string> = {
  Polo1: "Porto Velho",
  Polo2: "Polo2",
  Polo3: "Polo3",
  pv: "Porto Velho",
  vh: "Polo2",
}

// Mapeamento de abreviações para nomes de instituições
const institutionAbbreviations: Record<string, string[]> = {
  "Unireal": ["Unireal Polo1", "Unireal Polo2", "Unireal Polo3"],
  "UnirealEAD": ["UnirealEAD"],
  metro: ["UnirealEAD"],
}

export function SearchAutocomplete({
  placeholder = "Buscar cursos, instituições ou cidades...",
  className,
  variant = "default",
  onSearch,
}: SearchAutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Extrair cidades únicas dos dados de instituições
  const cidades = React.useMemo(() => {
    const cidadesUnicas = new Set(instituicoes.map((i) => i.cidade))
    return Array.from(cidadesUnicas).map((cidade) => ({
      id: `cidade-${cidade.toLowerCase().replace(/\s+/g, "-")}`,
      nome: cidade,
      tipo: "cidade" as const,
      subtitulo: "Cidade",
      prioridade: 1, // Alta prioridade para cidades
    }))
  }, [])

  // Função para verificar se o texto de busca corresponde a uma abreviação de cidade
  const matchesCityAbbreviation = React.useCallback((query: string, cityName: string): boolean => {
    query = query.toLowerCase()

    // Verificar abreviações diretas
    for (const [abbr, city] of Object.entries(cityAbbreviations)) {
      if (abbr === query && city.toLowerCase() === cityName.toLowerCase()) {
        return true
      }
    }

    return false
  }, [])

  // Função para verificar se o texto de busca corresponde a uma abreviação de instituição
  const matchesInstitutionAbbreviation = React.useCallback((query: string, institutionName: string): boolean => {
    query = query.toLowerCase()

    for (const [abbr, institutions] of Object.entries(institutionAbbreviations)) {
      if (abbr === query && institutions.some((inst) => inst.toLowerCase() === institutionName.toLowerCase())) {
        return true
      }
    }

    return false
  }, [])

  // Combinar resultados de cursos, instituições e cidades
  const searchResults = React.useMemo(() => {
    if (!searchQuery) return []

    const query = searchQuery.toLowerCase()

    // Verificar se a consulta corresponde a alguma abreviação conhecida
    const possibleCityName = cityAbbreviations[query]
    const possibleInstitutions = institutionAbbreviations[query] || []

    const cursoResults = cursos
      .filter((curso) => {
        return (
          curso.nome.toLowerCase().includes(query) ||
          curso.instituicao.toLowerCase().includes(query) ||
          possibleInstitutions.includes(curso.instituicao)
        )
      })
      .map((curso) => ({
        id: curso.id,
        nome: curso.nome,
        tipo: "curso" as const,
        subtitulo: curso.instituicao,
        prioridade: 2, // Prioridade média para cursos
      }))

    const instituicaoResults = instituicoes
      .filter((inst) => {
        return inst.nome.toLowerCase().includes(query) || matchesInstitutionAbbreviation(query, inst.nome)
      })
      .map((inst) => ({
        id: inst.id,
        nome: inst.nome,
        tipo: "instituicao" as const,
        subtitulo: `${inst.cidade}, ${inst.estado}`,
        prioridade: 3, // Prioridade baixa para instituições
      }))

    const cidadeResults = cidades
      .filter((cidade) => {
        return (
          cidade.nome.toLowerCase().includes(query) ||
          matchesCityAbbreviation(query, cidade.nome) ||
          (possibleCityName && cidade.nome.toLowerCase() === possibleCityName.toLowerCase())
        )
      })
      .map((cidade) => ({
        ...cidade,
        subtitulo: "Cidade",
        prioridade: 1, // Alta prioridade para cidades
      }))

    // Ordenar resultados por prioridade (menor número = maior prioridade)
    return [...cidadeResults, ...cursoResults, ...instituicaoResults].sort((a, b) => a.prioridade - b.prioridade)
  }, [searchQuery, cidades, matchesCityAbbreviation, matchesInstitutionAbbreviation])

  const handleSelect = React.useCallback(
    (result: SearchResult) => {
      setOpen(false)

      // Usar setTimeout para evitar problemas de atualização de estado
      setTimeout(() => {
        switch (result.tipo) {
          case "curso":
            router.push(`/bolsas/${result.id}`)
            break
          case "instituicao":
            router.push(`/instituicoes/${result.id}`)
            break
          case "cidade":
            router.push(`/bolsas?cidade=${encodeURIComponent(result.nome)}`)
            break
        }
      }, 0)
    },
    [router],
  )

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (!searchQuery) return

      if (onSearch) {
        onSearch(searchQuery)
      }

      // Verificar se a consulta corresponde a alguma abreviação conhecida
      const query = searchQuery.toLowerCase()
      const possibleCityName = cityAbbreviations[query]

      // Se for uma abreviação de cidade conhecida, redirecionar diretamente para a página da cidade
      if (possibleCityName) {
        setTimeout(() => {
          router.push(`/bolsas?cidade=${encodeURIComponent(possibleCityName)}`)
        }, 0)
        return
      }

      // Se for uma abreviação de instituição conhecida, redirecionar para a página da instituição
      for (const [abbr, institutions] of Object.entries(institutionAbbreviations)) {
        if (abbr === query && institutions.length > 0) {
          const institutionId = instituicoes.find((i) => i.nome === institutions[0])?.id
          if (institutionId) {
            setTimeout(() => {
              router.push(`/bolsas?instituicao=${encodeURIComponent(institutionId)}`)
            }, 0)
            return
          }
        }
      }

      if (searchResults.length > 0) {
        handleSelect(searchResults[0])
      } else {
        setTimeout(() => {
          router.push(`/bolsas?q=${encodeURIComponent(searchQuery)}`)
        }, 0)
      }
    },
    [searchQuery, searchResults, onSearch, handleSelect, router],
  )

  // Estilo condicional baseado na variante
  const inputStyle =
    variant === "hero" ? "bg-white/20 border-white/30 text-white placeholder:text-white/70" : "bg-background"

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={() => setOpen(true)}
          className={cn(inputStyle, "pr-10")}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Pequeno atraso para permitir que o clique no item seja processado
            setTimeout(() => setOpen(false), 200)
          }}
        />
        <Button
          type="submit"
          className={cn(
            "h-8 px-3 ghost absolute right-0 top-0 h-full px-3 hover:bg-transparent",
            variant === "hero" ? "text-white" : "text-muted-foreground"
          )}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Buscar</span>
        </Button>
      </form>

      {open && searchQuery && (
        <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover shadow-md">
          <Command>
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              {searchResults.length > 0 && (
                <CommandGroup heading="Resultados da busca">
                  {searchResults.map((result) => (
                    <CommandItem
                      key={`${result.tipo}-${result.id}`}
                      value={result.nome}
                      onSelect={() => handleSelect(result)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {result.tipo === "curso" && <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />}
                        {result.tipo === "instituicao" && <BuildingIcon className="h-4 w-4 text-muted-foreground" />}
                        {result.tipo === "cidade" && <MapPin className="h-4 w-4 text-muted-foreground" />}
                        <div className="flex flex-col">
                          <span>{result.nome}</span>
                          <span className="text-xs text-muted-foreground">{result.subtitulo}</span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      {...props}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
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
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}
