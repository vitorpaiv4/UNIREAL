export function InstitutionMap({
    instituicao,
    cidade,
    estado,
  }: { instituicao: string; cidade: string; estado: string }) {
    const addressMap: Record<string, string> = {
      "Unireal Polo1": "R. das Ararás, 241, Porto Velho, RO",
      "Unireal Polo2": "Av. Marques Henrique, 625, Polo2, RO",
      "Unireal Polo3": "Av. Vereador Otaviano Pereira Neto, 652, Polo3, RO",
      UnirealEAD: "R. das Ararás, 241, Porto Velho, RO",
    }
  
    const address = addressMap[instituicao] || `${instituicao}, ${cidade}, ${estado}`
  
    return (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground p-4 text-center">{address}</p>
      </div>
    )
  }
  