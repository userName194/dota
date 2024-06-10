import { Fira_Code } from 'next/font/google';

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
        <title>Guide of True Sight</title>
        {/* <meta name="google-site-verification" content="google060f7d62aa9de722" /> */}
        <meta name="description" content="Dota 2. Про скрытый пул" />
        <meta name="keywords" content="Дота 2, скрытый пул, тильт, порядочность, Dota 2, hidden pool, tilt, decency" />
      </head>
      <body>{children}</body>
    </html>
  )
}
