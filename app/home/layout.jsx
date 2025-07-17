import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import MovileNavbar from "@/components/movile-navbar"
import { getUserLangCookie } from "@/lib/session";
import { TranslationProvider } from "@/contexts/TranslationContext";

export default async function Layout({ children }) {

  const userLang = await getUserLangCookie();


  return (
    <SidebarProvider>
        <TranslationProvider lang={userLang}>
          <AppSidebar/>
        </TranslationProvider>
        <section className="flex flex-col md:flex-row w-full relative">
          {/* Mobile Header - Sticky with Full Width */}
          <MovileNavbar />
          <main className="h-full w-full p-4 md:p-6 bg-gray-50">
            {children}
          </main>
        </section>
    </SidebarProvider>
  )
}