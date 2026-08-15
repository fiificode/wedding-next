import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import TransitionProvider from "@/components/TransitionProvider";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "[Your Names] — The Wedding Issue",
  description:
    "A digital-magazine style wedding website template built in Next.js. Replace the bracketed placeholders with your own details.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif" }}>
        <Preloader />
        <CustomCursor />
        <TransitionProvider>
          <Nav />
          {children}
          <footer className="sitefoot">
            TEMPLATE — REPLACE ALL BRACKETED TEXT WITH YOUR OWN DETAILS
          </footer>
        </TransitionProvider>
      </body>
    </html>
  );
}
