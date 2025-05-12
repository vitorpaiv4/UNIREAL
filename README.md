# 🎓 UniReal Frontend

Este é o repositório do **frontend do UniReal**, um site fictício de uma instituição de ensino superior, desenvolvido por [Vitor Paiva](https://github.com/vitorpaiv4). O projeto foi criado com foco em boas práticas de desenvolvimento, responsividade e organização de código.

## 🚀 Tecnologias Utilizadas

- **Next.js** — Framework React para aplicações web modernas com renderização SSR e SSG.
- **TypeScript** — Superset do JavaScript com tipagem estática.
- **Tailwind CSS** — Framework de utilitários CSS para estilização ágil e consistente.
- **PNPM** — Gerenciador de pacotes rápido e eficiente.

## 📁 Estrutura do Projeto

A estrutura foi organizada de forma modular, visando escalabilidade e manutenção:

```
app/
  bolsas/
    [id]/
      escolher/
  cadastro/
  contato/
  instituicoes/
  login/
  sobre/
components/
  ui/
  hooks/
data/
lib/
public/
styles/
```

- **app/**: Rotas e páginas organizadas hierarquicamente.
- **components/**: Componentes reutilizáveis, divididos em UI e lógicas específicas.
- **data/**: Dados mockados ou estáticos utilizados na aplicação.
- **lib/**: Funções utilitárias e bibliotecas auxiliares.
- **public/**: Arquivos públicos (imagens, ícones, fontes, etc).
- **styles/**: Estilos globais e configurações do Tailwind.

## 🛠️ Como Executar Localmente

1. Certifique-se de ter o **Node.js** instalado.
2. Instale as dependências com PNPM:

   ```bash
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📜 Scripts Disponíveis

| Comando       | Descrição                                |
|---------------|------------------------------------------|
| `pnpm dev`    | Inicia o servidor de desenvolvimento     |
| `pnpm build`  | Gera a build otimizada para produção     |
| `pnpm start`  | Inicia o servidor em modo de produção    |
| `pnpm lint`   | Executa o linter para verificar o código |

## 🤝 Contribuindo

Contribuições são muito bem-vindas!
Você pode abrir uma issue para relatar problemas ou uma pull request com melhorias e novas funcionalidades.

## 📄 Licença

Este projeto está licenciado sob a MIT License.
Consulte o arquivo LICENSE para mais detalhes.

---

Feito com 💙 por Vitor Paiva

---

# 🎓 UniReal Frontend (English Version)

This is the repository for the **UniReal frontend**, a fictional website for a higher education institution, developed by [Vitor Paiva](https://github.com/vitorpaiv4). The project was created with a focus on best development practices, responsiveness, and code organization.

## 🚀 Technologies Used

- **Next.js** — React framework for modern web applications with SSR and SSG rendering.
- **TypeScript** — A superset of JavaScript with static typing.
- **Tailwind CSS** — Utility-first CSS framework for fast and consistent styling.
- **PNPM** — Fast and efficient package manager.

## 📁 Project Structure

The structure is modular, aiming for scalability and maintainability:

```
app/
  bolsas/
    [id]/
      escolher/
  cadastro/
  contato/
  instituicoes/
  login/
  sobre/
components/
  ui/
  hooks/
data/
lib/
public/
styles/
```

- **app/**: Routes and pages organized hierarchically.
- **components/**: Reusable components, divided into UI and specific logic.
- **data/**: Mocked or static data used in the application.
- **lib/**: Utility functions and auxiliary libraries.
- **public/**: Public files (images, icons, fonts, etc).
- **styles/**: Global styles and Tailwind configurations.

## 🛠️ How to Run Locally

1. Make sure you have **Node.js** installed.
2. Install dependencies with PNPM:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Access [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command       | Description                                |
|---------------|------------------------------------------|
| `pnpm dev`    | Starts the development server             |
| `pnpm build`  | Generates the optimized production build  |
| `pnpm start`  | Starts the server in production mode      |
| `pnpm lint`   | Runs the linter to check the code         |

## 🤝 Contributing

Contributions are very welcome!
You can open an issue to report problems or a pull request with improvements and new features.

## 📄 License

This project is licensed under the MIT License.
See the LICENSE file for more details.

---

Made with 💙 by Vitor Paiva
