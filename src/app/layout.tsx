import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "./lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chess Openings — Interactive Guide",
  description:
    "Step through classic chess openings move by move with an interactive board.",
};

// Inlined and run before paint so a saved theme applies without a flash.
const themeBootstrap = `
  (function () {
    try {
      var k = ${JSON.stringify(THEME_STORAGE_KEY)};
      var d = ${JSON.stringify(DEFAULT_THEME)};
      var t = localStorage.getItem(k);
      if (t !== "dark" && t !== "light") t = d;
      document.documentElement.setAttribute("data-theme", t);
    } catch (e) {
      document.documentElement.setAttribute("data-theme", ${JSON.stringify(DEFAULT_THEME)});
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-full">
        <main>{children}</main>
      </body>
    </html>
  );
}
