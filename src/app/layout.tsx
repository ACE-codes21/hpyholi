import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Holi - Send Colorful Greetings",
  description: "Celebrate the festival of colors with our beautiful Holi greeting cards. Customize and share your wishes with loved ones.",
  keywords: "Holi, festival of colors, greeting cards, celebration, Indian festival",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
