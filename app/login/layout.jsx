import { TranslationProvider } from "@/contexts/TranslationContext";
import { getUserLangCookie } from "@/lib/session";

export default async function LoginLayout({ children }) {

    const userLang = await getUserLangCookie();

    return (
        <TranslationProvider lang={userLang}>
          {children}
        </TranslationProvider>
    );
  }