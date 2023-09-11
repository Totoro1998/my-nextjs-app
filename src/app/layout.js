import "./globals.css";
import Auth from "@/components/Auth";
import GoogleAnalytics from "@/components/pages/GoogleAnalytics";
import { Toaster } from "@/components/ui/Toast";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "GuruSql",
  description: "GuruSql",
  icons: {
    icon: "/logo-icon.svg",
    shortcut: "/logo-icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <GoogleAnalytics />
        <Auth>{children}</Auth>
        <Toaster />
      </body>
    </html>
  );
}
