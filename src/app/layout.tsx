import { Fira_Code } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fira_code = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={fira_code.className}>
      <head>
        <title>Guide of the True Sight</title>
        <meta name="google-site-verification" content="google060f7d62aa9de722" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Dota 2. Про скрытый пул" />
        <meta name="keywords" content="Дота 2, скрытый пул, тильт, порядочность, Dota 2, hidden pool, tilt, decency" />
        <link rel="preload" href="../components/Header/img/title_Omniknight.png" as="image"></link>
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
