import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Abdullah Shehada - Portfolio",
  description:
    "Abdullah Shehada — Computer Engineering graduate (GPA 90.7), AI Tools Developer & Frontend Engineer. Teaching Assistant at the Islamic University of Gaza.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
