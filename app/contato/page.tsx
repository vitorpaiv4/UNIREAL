"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const endereco = "R. canoa quebrada, 4588 - Porto Velho, RO - CEP 76883-678"

export default function ContatoPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/40 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Entre em Contato</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Estamos aqui para ajudar você a encontrar a melhor oportunidade de bolsa de estudo
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Formulário de Contato</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" placeholder="Digite seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Digite seu email" type="email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input id="assunto" placeholder="Digite o assunto" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea
                      className="min-h-[150px]"
                      id="mensagem"
                      placeholder="Digite sua mensagem"
                    />
                  </div>
                  <Button className="text-lg">Enviar Mensagem</Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Informações de Contato</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Você também pode nos encontrar pelos seguintes meios:
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Endereço</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{endereco}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Telefone</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">(69) 3999-9999</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">contato@Unireal.com.br</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Horário de Funcionamento</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Segunda a Sexta: 8h às 18h
                      <br />
                      Sábado: 8h às 12h
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden h-[300px] border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.5635686963246!2d-63.89851492474736!3d-8.733334891571821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92325c1dd8fec273%3A0x7a8b4b31b1c95f0b!2sR.%20das%20Araras%2C%20241%20-%20Nova%20Porto%20Velho%2C%20Porto%20Velho%20-%20RO%2C%2076811-678!5e0!3m2!1spt-BR!2sbr!4v1682366124559!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
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
