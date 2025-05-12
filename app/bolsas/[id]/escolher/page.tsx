"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cursos } from "@/data/cursos"
import { notFound, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Loader2 } from "lucide-react"

export default function EscolherBolsaPage() {
  const params = useParams()
  const curso = cursos.find((c) => c.id === params.id)

  const [endereco, setEndereco] = useState({
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    numero: ""
  })

  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [erroCep, setErroCep] = useState("")

  // Efeito para buscar o CEP quando tiver 8 dígitos
  useEffect(() => {
    const numerosCep = endereco.cep.replace(/\D/g, "")
    if (numerosCep.length === 8) {
      const buscarEndereco = async () => {
        setIsLoadingCep(true)
        setErroCep("")
        try {
          const response = await fetch(`https://viacep.com.br/ws/${numerosCep}/json/`)
          const data = await response.json()
          
          if (data.erro) {
            setErroCep("CEP não encontrado")
            return
          }

          setEndereco(prev => ({
            ...prev,
            estado: data.uf,
            cidade: data.localidade,
            bairro: data.bairro,
            logradouro: data.logradouro,
            complemento: data.complemento || ""
          }))
        } catch (error) {
          console.error("Erro ao buscar CEP:", error)
          setErroCep("Erro ao buscar o CEP. Tente novamente.")
        } finally {
          setIsLoadingCep(false)
        }
      }

      buscarEndereco()
    }
  }, [endereco.cep])

  if (!curso) {
    notFound()
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/40 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Inscrição para Bolsa de Estudos
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Preencha o formulário abaixo para se inscrever na bolsa de {curso.desconto}% para o curso de{" "}
                {curso.nome}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            <div>
              <form className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Dados Pessoais</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" placeholder="Digite seu nome completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="(00) 00000-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                      <Input id="data-nascimento" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genero">Gênero</Label>
                      <Select>
                        <SelectTrigger id="genero">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                          <SelectItem value="nao-informar">Prefiro não informar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Endereço</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <div className="relative">
                        <Input 
                          id="cep" 
                          placeholder="00000-000" 
                          value={endereco.cep}
                          onChange={(e) => {
                            // Remove tudo que não for número
                            const apenasNumeros = e.target.value.replace(/\D/g, '')
                            
                            // Se tiver mais de 8 dígitos, corta
                            if (apenasNumeros.length > 8) {
                              return
                            }
                            
                            // Se tiver 8 dígitos, formata
                            if (apenasNumeros.length === 8) {
                              setEndereco(prev => ({
                                ...prev,
                                cep: `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5)}`
                              }))
                            } else {
                              // Se não, mantém só os números
                              setEndereco(prev => ({
                                ...prev,
                                cep: apenasNumeros
                              }))
                            }
                          }}
                          disabled={isLoadingCep}
                          className={erroCep ? "border-red-500" : ""}
                          maxLength={9}
                        />
                        {isLoadingCep && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      {erroCep && (
                        <p className="text-sm text-red-500">{erroCep}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Select 
                        value={endereco.estado} 
                        onValueChange={(value) => setEndereco({ ...endereco, estado: value })}
                        disabled={isLoadingCep}
                      >
                        <SelectTrigger id="estado">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RO">Rondônia</SelectItem>
                          <SelectItem value="AC">Acre</SelectItem>
                          <SelectItem value="AM">Amazonas</SelectItem>
                          <SelectItem value="RR">Roraima</SelectItem>
                          <SelectItem value="PA">Pará</SelectItem>
                          <SelectItem value="AP">Amapá</SelectItem>
                          <SelectItem value="TO">Tocantins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input 
                        id="cidade" 
                        placeholder="Digite sua cidade" 
                        value={endereco.cidade}
                        onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                        disabled={isLoadingCep}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input 
                        id="bairro" 
                        placeholder="Digite seu bairro" 
                        value={endereco.bairro}
                        onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                        disabled={isLoadingCep}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input 
                        id="endereco" 
                        placeholder="Rua, Avenida, etc." 
                        value={endereco.logradouro}
                        onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
                        disabled={isLoadingCep}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número</Label>
                      <Input 
                        id="numero" 
                        placeholder="Nº" 
                        value={endereco.numero}
                        onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complemento">Complemento</Label>
                      <Input 
                        id="complemento" 
                        placeholder="Apto, Bloco, etc." 
                        value={endereco.complemento}
                        onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Formação Acadêmica</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="escolaridade">Escolaridade</Label>
                      <Select>
                        <SelectTrigger id="escolaridade">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medio-completo">Ensino Médio Completo</SelectItem>
                          <SelectItem value="superior-incompleto">Superior Incompleto</SelectItem>
                          <SelectItem value="superior-completo">Superior Completo</SelectItem>
                          <SelectItem value="pos-graduacao">Pós-graduação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ano-conclusao">Ano de Conclusão</Label>
                      <Input id="ano-conclusao" placeholder="AAAA" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="instituicao-anterior">Instituição de Ensino</Label>
                      <Input id="instituicao-anterior" placeholder="Nome da instituição onde concluiu o ensino médio" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Informações Adicionais</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="como-conheceu">Como conheceu o Unireal?</Label>
                      <Select>
                        <SelectTrigger id="como-conheceu">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="redes-sociais">Redes Sociais</SelectItem>
                          <SelectItem value="indicacao">Indicação de Amigos</SelectItem>
                          <SelectItem value="google">Pesquisa no Google</SelectItem>
                          <SelectItem value="tv">TV</SelectItem>
                          <SelectItem value="radio">Rádio</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivo">Por que você escolheu este curso?</Label>
                      <Textarea
                        id="motivo"
                        placeholder="Conte-nos um pouco sobre sua motivação para escolher este curso"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
                  <Button variant="outline" size="lg" asChild>
                    <Link href={`/bolsas/${curso.id}`}>Voltar</Link>
                  </Button>
                  <Button size="lg" type="submit">
                    Enviar Inscrição
                  </Button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Resumo da Bolsa</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Curso:</div>
                      <div className="font-medium">{curso.nome}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Instituição:</div>
                      <div className="font-medium">{curso.instituicao}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Modalidade:</div>
                      <div className="font-medium">{curso.modalidade}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground">Desconto:</div>
                      <Badge className="mt-1 bg-green-500 hover:bg-green-600 text-white">{curso.desconto}%</Badge>
                    </div>
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
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold">Próximos Passos</h3>
                  <ol className="space-y-2 list-decimal list-inside text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">1.</span>
                      <span>Após o envio do formulário, nossa equipe entrará em contato para confirmar seus dados</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">2.</span>
                      <span>Você receberá um e-mail com as instruções para envio dos documentos necessários</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">3.</span>
                      <span>Após a análise dos documentos, você será contatado para finalizar a matrícula</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">4.</span>
                      <span>Realize o pagamento da primeira mensalidade para garantir sua vaga</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-medium">Processo simplificado</h4>
                    <p className="text-sm text-muted-foreground">
                      Sem burocracia, com resultados rápidos para você começar logo seus estudos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
