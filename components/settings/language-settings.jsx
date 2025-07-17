"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectField } from "../form-fields/select-field";
import { useT } from "@/contexts/TranslationContext";
import { updateLanguage } from "@/lib/settings_actions";

export function LanguageSettings({ currentLang }) {
  const { t } = useT();
  
  const languages = [
    { id: "es", name: t('settings_language_spanish') },
    { id: "en", name: t('settings_language_english') }
  ];
  
  const handleLanguageChange = async (name, value) => {
    try {

      const {error} = await updateLanguage(value);

      if (error) {
        console.error('Error updating language:', error);
      } 
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings_language_title')}</CardTitle>
        <CardDescription>{t('settings_language_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <SelectField
          id="language"
          name="language"
          label={t('settings_language_label')}
          value={currentLang}
          onValueChange={handleLanguageChange}
          options={languages}
        />
      </CardContent>
    </Card>
  );
} 