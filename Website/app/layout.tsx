import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

interface ManualMetadata {
  title: string | null;
  description?: string | null;
  manifest?: string | null;
  appleWebApp?: {
    title?: string | null;
    statusBarStyle?: "default" | "black" | "black-translucent" | null;
  } | null;
  icons?: {
    icon?: string | null;
    apple?: string | null;
  } | null;
  themeColor?: string | null;
}

export const metadata: ManualMetadata = {
  title: "CampusOne",
  description:
    "Streamline attendance, manage classes, track performance, and more with our comprehensive school management system.",
  manifest: "/manifest.json",
  appleWebApp: {
    title: "CampusOne",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icons/present_sir_dark_logo.png",
    apple: "/icons/present_sir_dark_logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: "#4f46e5",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
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
