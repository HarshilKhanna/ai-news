import "./globals.css"

export const metadata = {
  title: "NewsDigest - Personalized News Summarizer",
  description: "Stay updated with the latest news tailored to your interests",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}



import './globals.css'