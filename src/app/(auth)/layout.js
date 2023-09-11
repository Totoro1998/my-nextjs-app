import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuthLayout({ children }) {
  return (
    <div className="bg-[url('/background.svg')] full-bg overflow-y-overlay">
      <div className="min-100vh-bg-blur flex flex-col">
        <Header hiddenUserMenu={true} />
        <main className="w-full flex-1 flex flex-col items-center justify-center">
          {children}
        </main>
        <Footer showDisclaimer={false} />
      </div>
    </div>
  );
}
