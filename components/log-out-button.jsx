"use client";


import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { handleLogout } from "@/lib/server-utils";
import { useT } from "@/contexts/TranslationContext";

export default function LogoutButton({ isOpen }) {

    const { t } = useT();

    return (
        <form action={handleLogout}>
            <Button className="cursor-pointer w-full">
                <span className={`${!isOpen ? "hidden" : ""}`}>{t('log_out')}</span> 
                <LogOut />
            </Button>
        </form>
    );
}
