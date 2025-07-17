import { getGeminiApiKey, getUserRole, loadTranslations } from "@/lib/server-utils";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { getSession, getUserLangCookie } from "@/lib/session";
import { LanguageSettings } from "@/components/settings/language-settings";
import { CompanySettings } from "@/components/settings/company-settings";
import { checkVisibility } from "@/lib/authorization";

export default async function SettingsPage() {
  const translations = await loadTranslations();
  const lang = await getUserLangCookie();
  const { username, empresa } = await getSession();

  const role = await getUserRole(username);
  const geminiApiKey = await getGeminiApiKey();

  const isCompanySettingsVisible = checkVisibility(role, "settings")

  return (
    <article className="flex flex-col gap-4 max-w-5xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">
          {translations["settings_tittle"]}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {translations["settings_subtitle"]}
        </p>
      </header>
      <section className="flex flex-col gap-4">
        <TranslationProvider lang={lang}>
          <CompanySettings company={empresa} visible={isCompanySettingsVisible}/>
          <LanguageSettings currentLang={lang} />
        </TranslationProvider>
      </section>
    </article>
  );
}
