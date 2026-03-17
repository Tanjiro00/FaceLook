import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "FaceLook — AI Virtual Try-On for Cosmetic Procedures",
    template: "%s | FaceLook",
  },
  description:
    "Upload a selfie, choose a procedure, see your photorealistic result in 10 seconds. Powered by generative AI.",
  keywords: [
    "virtual try-on",
    "plastic surgery",
    "AI",
    "rhinoplasty",
    "cosmetic procedures",
    "before after",
  ],
  authors: [{ name: "FaceLook" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FaceLook",
    title: "FaceLook — See Yourself Before Surgery",
    description:
      "AI-powered virtual try-on for cosmetic procedures. Photorealistic results in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FaceLook — AI Virtual Try-On",
    description: "See your cosmetic procedure results before surgery.",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
