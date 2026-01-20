import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { OrganisationProvider } from '@/lib/contexts/OrganisationContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Unify - Institutional Memory That Never Graduates',
  description:
    'Preserve institutional knowledge across 100% annual committee turnover. Transform scattered emails and documents into organised institutional intelligence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <OrganisationProvider>
              {children}
            </OrganisationProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
