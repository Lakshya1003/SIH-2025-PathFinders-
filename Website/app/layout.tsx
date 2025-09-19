import { Inter } from "next/font/google";
import "@/app/globals.css";
import PWAInstaller from './components/PWAInstaller';
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";  // <-- Import the Metadata type from next
import { ReactNode } from "react";  // <-- Import ReactNode type

const inter = Inter({ subsets: ["latin"] });

// Ensure the metadata is typed correctly as Metadata
export const metadata: Metadata = {
  title: "PresentSir",
  description:
    "Streamline attendance, manage classes, track performance, and more with our comprehensive school management system.",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "PresentSir",
    statusBarStyle: "default",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: '#4f46e5',
};

// Explicitly type the 'children' prop as ReactNode
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/present_sir_dark_logo.png" />
        <link rel="apple-touch-icon" href="/icons/present_sir_dark_logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        {children}
        <PWAInstaller />
        <Toaster />
        <Script
          id="register-service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
