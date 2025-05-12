import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Melhorar a performance de carregamento de fontes
})

export const metadata: Metadata = {
  title: "Unireal - Bolsas de Estudo",
  description: "Encontre as melhores bolsas de estudo para cursos de graduação nas faculdades Unireal e UnirealEAD",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://Unireal.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://Unireal.com.br",
    siteName: "Unireal - Bolsas de Estudo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Unireal- Bolsas de Estudo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unireal- Bolsas de Estudo",
    description: "Encontre as melhores bolsas de estudo para cursos de graduação nas faculdades Unireal e UnirealEAD",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Prevenir erros de Service Worker
            window.addEventListener('error', function(event) {
              if (event.message && event.message.includes('ServiceWorker')) {
                console.warn('Service Worker error handled. App will continue without offline capabilities.');
                event.preventDefault();
              }
            });
            
            // Otimização de carregamento de imagens
            document.addEventListener('DOMContentLoaded', function() {
              // Adiar o carregamento de imagens não críticas
              setTimeout(function() {
                var lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
                if ('IntersectionObserver' in window) {
                  let lazyImageObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                      if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        if (lazyImage.dataset.src) {
                          lazyImage.src = lazyImage.dataset.src;
                          lazyImage.removeAttribute('data-src');
                        }
                        lazyImageObserver.unobserve(lazyImage);
                      }
                    });
                  });
                  
                  lazyImages.forEach(function(lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                  });
                }
              }, 200);
            });
          `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}
