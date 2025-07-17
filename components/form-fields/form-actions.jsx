"use client";

import { useFormStatus } from "react-dom"; // Import useFormStatus
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "@/contexts/TranslationContext";

export function FormActions({ onCancel, onSaveMessage, isOwner = true }) { // Removed isSubmitting prop
  const { pending } = useFormStatus(); // Get pending state from the form action
  const router = useRouter();

  const { t } = useT();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.push("/home"); // Default cancel behavior
    }
  };

  return (
    <div className={`flex justify-end ${isOwner ? "space-x-4" : ""}`}>
      <Button type="button" variant="outline" onClick={handleCancel} disabled={pending} className="cursor-pointer">
        {t('button_discard')}
      </Button>
      {/* Button automatically disables based on form pending state */}
      <Button type="submit" disabled={pending} aria-disabled={pending} className={`cursor-pointer ${isOwner ? "visible" : "hidden"}`}>
        {pending ? t('button_save_loading') : onSaveMessage || t('button_save')}
      </Button>
    </div>
  );
}