import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide border-b-2 border-green-400 pb-2 inline-block">Sobre Nós</h3>
            <p className="text-sm leading-relaxed text-gray-100 max-w-sm">
              Ajudamos estudantes a encontrar as melhores oportunidades de bolsas de estudo em instituições de ensino de
              qualidade.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide border-b-2 border-green-400 pb-2 inline-block">Links Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-green-200 transition-colors duration-200 flex items-center gap-2">
                  <span className="h-1 w-1 bg-green-300 rounded-full"></span>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/bolsas" className="hover:text-green-200 transition-colors duration-200 flex items-center gap-2">
                  <span className="h-1 w-1 bg-green-300 rounded-full"></span>
                  Bolsas
                </Link>
              </li>
              <li>
                <Link href="/instituicoes" className="hover:text-green-200 transition-colors duration-200 flex items-center gap-2">
                  <span className="h-1 w-1 bg-green-300 rounded-full"></span>
                  Instituições
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-green-200 transition-colors duration-200 flex items-center gap-2">
                  <span className="h-1 w-1 bg-green-300 rounded-full"></span>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-green-200 transition-colors duration-200 flex items-center gap-2">
                  <span className="h-1 w-1 bg-green-300 rounded-full"></span>
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide border-b-2 border-green-400 pb-2 inline-block">Instituições</h3>
            <ul className="space-y-4 text-sm">
              <li className="group">
                <h4 className="font-medium mb-1">Unireal Porto Velho</h4>
                <a href="https://Unireal.com.br" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-200 hover:text-green-200 transition-colors duration-200 block">www.Unireal.com.br</a>
                <span className="text-gray-300">(69) 3999-9999</span>
              </li>
              <li className="group">
                <h4 className="font-medium mb-1">UnirealEAD</h4>
                <a href="https://UnirealEAD-ro.com.br" target="_blank" rel="noopener noreferrer"
                   className="text-gray-200 hover:text-green-200 transition-colors duration-200 block">www.UnirealEAD-ro.com.br</a>
                <span className="text-gray-300">(69) 3999-9999</span>
              </li>
              <li className="group">
                <h4 className="font-medium mb-1">Unireal Polo3</h4>
                <a href="https://Polo3.Unireal.com.br" target="_blank" rel="noopener noreferrer"
                   className="text-gray-200 hover:text-green-200 transition-colors duration-200 block">www.Polo3.Unireal.com.br</a>
                <span className="text-gray-300">(69) 3999-9999</span>
              </li>
              <li className="group">
                <h4 className="font-medium mb-1">Unireal Polo2</h4>
                <a href="https://Polo2.Unireal.com.br" target="_blank" rel="noopener noreferrer"
                   className="text-gray-200 hover:text-green-200 transition-colors duration-200 block">www.Polo2.Unireal.com.br</a>
                <span className="text-gray-300">(69) 3999-9999</span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide border-b-2 border-green-400 pb-2 inline-block">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 hover:text-green-200 transition-colors duration-200">
                <div className="bg-green-600 p-2 rounded-full shadow-md">
                  <Phone className="h-4 w-4" />
                </div>
                <span>(69) 3999-9999</span>
              </li>
              <li className="flex items-center gap-3 hover:text-green-200 transition-colors duration-200">
                <div className="bg-green-600 p-2 rounded-full shadow-md">
                  <Mail className="h-4 w-4" />
                </div>
                <span>contato@Unireal.com.br</span>
              </li>
              <li className="flex items-center gap-3 hover:text-green-200 transition-colors duration-200">
                <div className="bg-green-600 p-2 rounded-full shadow-md">
                  <Clock className="h-4 w-4" />
                </div>
                <span>Seg-Sex, 8h-18h</span>
              </li>
              <li className="flex items-center gap-3 hover:text-green-200 transition-colors duration-200">
                <div className="bg-green-600 p-2 rounded-full shadow-md">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Porto Velho, RO</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-green-400/20 pt-8 text-center text-sm">
          <p className="text-gray-200">© {new Date().getFullYear()} Unireal Bolsas de Estudo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
