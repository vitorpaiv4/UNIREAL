"use client"

import { CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AnimatedCard } from "@/components/animated-card"
import { useMemo } from "react"

interface CourseCardProps {
  curso: {
    id: string
    nome: string
    instituicao: string
    modalidade: string
    avaliacao: number
    mensalidade: number
    mensalidadeComDesconto: number
    desconto: number
    economiaSemestre: number
  }
  index?: number
}

export function CourseCard({ curso, index = 0 }: CourseCardProps) {
  // Função para obter a imagem do curso com base no ID ou nome - memoizada para melhor performance
  const cursoImage = useMemo(() => {
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
    return "/placeholder.svg?height=200&width=300&text=Curso"
  }, [curso.id, curso.nome])

  // Determinar se a imagem deve ter prioridade (para os primeiros 6 cards)
  const isPriority = index < 6

  return (
    <AnimatedCard delay={Math.min(index, 10) * 0.05}>
      <div className="relative h-48 w-full overflow-hidden">
        {/* Imagem do curso com otimizações */}
        <Image
          src={cursoImage || "/placeholder.svg"}
          alt={curso.nome}
          fill
          className="object-cover"
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
        />

        {/* Gradiente para melhorar a visibilidade do badge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Badge de desconto */}
        <div className="absolute top-4 right-4">
          <div className="bg-green-500 text-white font-bold rounded-lg px-4 py-2 shadow-lg">
            Bolsa de {curso.desconto}%
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-xl line-clamp-2">{curso.nome}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{curso.instituicao}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{curso.avaliacao.toFixed(1)}</span>
              <span className="text-yellow-400">★</span>
              <span className="text-muted-foreground">Excelente</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="rounded-sm">
                {curso.modalidade}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Mensalidade:</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm line-through text-muted-foreground">
                  R$ {curso.mensalidade.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-lg font-bold text-green-600 dark:text-green-500">
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
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/bolsas/${curso.id}`}>Ver detalhes</Link>
        </Button>
        <Button size="sm" className="w-full" asChild>
          <Link href={`/bolsas/${curso.id}/escolher`}>Escolha esta bolsa</Link>
        </Button>
      </CardFooter>
    </AnimatedCard>
  )
}
