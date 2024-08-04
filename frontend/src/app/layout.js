"use client";
import "../../styles/globals.css";
import { AuthProvider } from "@/context/auth";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
