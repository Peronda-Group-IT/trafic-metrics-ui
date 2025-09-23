"use client"

import { useSidebar } from "./ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";


export default function MovileNavbar(){

    const { toggleSidebar } = useSidebar()

    return(
        <section className="z-10 sticky top-0 
        px-2 h-10 flex items-center w-full bg-sidebar-accent md:hidden">
            <Button size="icon" variant={"ghost"} className="size-8" onClick={toggleSidebar}>
                <ChevronRightIcon strokeWidth={1.50}/>
            </Button>
        </section>
    );
}