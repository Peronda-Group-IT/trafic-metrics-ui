"use client";

import { Home, PanelLeftClose, PanelLeftOpen, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import Image from "next/image";
import LogoutButton from "./log-out-button";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useT } from "@/contexts/TranslationContext";

const URL = process.env.NEXT_PUBLIC_URL;

const BASE_PATH = "";

export function AppSidebar() {
  const { t } = useT();

  // Menu items.
  const items = [
    {
      title: t("sidebar_element_inicio"),
      url: `${BASE_PATH}/home`,
      icon: Home,
    },
    {
      title: t("sidebar_element_settings"),
      url: `${BASE_PATH}/home/settings`,
      icon: Settings,
    },
  ];

  const { state, toggleSidebar } = useSidebar();

  const isOpen = state === "expanded";

  const pathname = usePathname();

  const isMobile = useIsMobile();

  const handleSidebarItemClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row justify-between items-center">
        <SidebarMenuItem className={`${isOpen ? "block" : "hidden"}`}>
          <Image src={`${URL}/rhino.png`} height={35} width={35} alt="CRM" />
        </SidebarMenuItem>
        <div className="ml-auto cursor-pointer" onClick={toggleSidebar}>
          {isOpen ? (
            <PanelLeftClose strokeWidth={1.25} />
          ) : (
            <PanelLeftOpen strokeWidth={1.25} />
          )}
        </div>
      </SidebarHeader>
      <Separator className={"mt-2"} />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("sidebar_menu")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`text-md ${
                      item.url === pathname
                        ? "bg-gray-100"
                        : pathname !== "/home" &&
                          item.url
                            .replace("/home", "")
                            .includes(pathname.replace("/home", ""))
                        ? "bg-gray-100"
                        : ""
                    }`}
                  >
                    <Link href={item.url} onClick={handleSidebarItemClick}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator className={"my-2"} />
      <SidebarFooter>
        <LogoutButton isOpen={isOpen} />
      </SidebarFooter>
    </Sidebar>
  );
}
