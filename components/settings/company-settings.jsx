"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectField } from "../form-fields/select-field";
import { useT } from "@/contexts/TranslationContext";
import { updateCompanyInDB } from "@/lib/settings_actions";

export function CompanySettings({ company, visible }) {
  const { t } = useT();

  const languages = [
    { id: "1", name: "Peronda Group" },
    { id: "11", name: "PG Hub" },
  ];

  const handleCompanyChange = async (name, value) => {
    try {
      const { error } = await updateCompanyInDB(value);

      if (error) {
        console.error("Error updating company:", error);
      }
    } catch (error) {
      console.error("Error updating company:", error);
    }
  };

  return (
    <Card className={`${visible ? "" : "hidden"}`}>
      <CardHeader>
        <CardTitle>{t("settings_company_tittle")}</CardTitle>
        <CardDescription>{t("settings_company_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <SelectField
          id="company"
          name="company"
          label={t("setting_company_label")}
          value={company}
          onValueChange={handleCompanyChange}
          options={languages}
        />
      </CardContent>
    </Card>
  );
}
