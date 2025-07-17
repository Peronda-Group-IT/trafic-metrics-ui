"use client"

import { PanelLeftOpen } from "lucide-react";
import { useSidebar } from "./ui/sidebar";


export default function MovileNavbar(){

    const { toggleSidebar } = useSidebar()

    return(
        <section className="z-10 sticky top-0 
        px-2 h-10 flex items-center w-full bg-sidebar-accent md:hidden">
            <PanelLeftOpen strokeWidth={1.50} onClick={toggleSidebar}/>
        </section>
    );
}