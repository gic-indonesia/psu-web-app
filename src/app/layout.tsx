import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import StoreProvider from "@src/lib/redux/StoreProvider";
import ToastProvider from "@src/lib/react-toastify/ToastProvider";
import Main from "@layouts/wrappers/main";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Regular, Medium, Bold
  variable: '--font-inter', // Custom CSS variable
});

export const metadata: Metadata = {
  title: "PSU App",
  description: "PT. Pakan Sehat Unggul",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#d97706",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}`}
      >
        <StoreProvider>
          <ToastProvider>
            <Main>
              {children}
            </Main>
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
