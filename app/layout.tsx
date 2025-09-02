import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/theme/theme-provider';
import { ChatProvider } from '@/components/providers/ChatProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Production UI Starter',
  description:
    'A production-ready Next.js starter with atomic design principles, accessibility compliance, and white-label theming.',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Accessibility'],
  authors: [{ name: 'UI Starter Team' }],
  creator: 'UI Starter',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Production UI Starter',
    description: 'A production-ready Next.js starter with atomic design principles.',
    siteName: 'Production UI Starter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Production UI Starter',
    description: 'A production-ready Next.js starter with atomic design principles.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
