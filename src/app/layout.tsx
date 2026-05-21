import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "সাক্ষী — বাংলাদেশ সামাজিক ন্যায়বিচার প্ল্যাটফর্ম",
  description:
    "বাংলাদেশের শিশু নির্যাতন, ধর্ষণ, হত্যা, দুর্নীতি ও বিচারহীনতার ঘটনা নথিভুক্ত ও ট্র্যাক করুন। কোনো ঘটনা যেন ভুলে না যায়।",
  keywords: [
    "সাক্ষী",
    "Sakkhi",
    "Bangladesh",
    "social justice",
    "child abuse",
    "corruption",
    "accountability",
    "সামাজিক ন্যায়বিচার",
    "বাংলাদেশ",
  ],
  authors: [{ name: "Sakkhi Team" }],
  openGraph: {
    title: "সাক্ষী — বাংলাদেশ সামাজিক ন্যায়বিচার প্ল্যাটফর্ম",
    description:
      "বাংলাদেশের অন্যায় ও বিচারহীনতার বিরুদ্ধে সচেতনতা ও জবাবদিহিতার প্ল্যাটফর্ম।",
    type: "website",
    locale: "bn_BD",
    siteName: "সাক্ষী",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${hindSiliguri.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-16 pb-20 lg:pb-0">{children}</main>
          <MobileNav />
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 border border-surface-200 dark:border-surface-700",
            }}
            richColors
            closeButton
          />
        </Providers>
      </body>
    </html>
  );
}
