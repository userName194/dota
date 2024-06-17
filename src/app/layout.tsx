
import { Fira_Code } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from 'next/script';

const fira_code = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const title = "Guide of the True Sight";
  const description = "Dota 2. Про скрытый пул";
  return (
    <html lang="ru" className={fira_code.className}>
      <head>
        <title>{title}</title>
        <meta name="google-site-verification" content="google060f7d62aa9de722" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="keywords" content="Дота 2, скрытый пул, тильт, порядочность, Dota 2, hidden pool, tilt, decency" />
        {/* Open Graph meta tags */}
        <meta property="og:site_name" content={title} />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://dota-seven.vercel.app/title_Omniknight.png" />
        <meta property="og:image:width" content="1366" />
        <meta property="og:image:height" content="768" />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
