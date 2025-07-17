"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export function SearchBar({ placeholder = 'Buscar...', buttonSearchText = 'Buscar' }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)  
    if (searchTerm) {
        params.set('search', searchTerm);
    } else {
        params.delete('search');
    }
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form action={handleSearch} className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          id='companies serchbar' 
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-background"
        />
      </div>
      <Button type="submit" className={'cursor-pointer'}>
        <Search className="md:mr-2" />
        <span className="hidden md:block">
          {buttonSearchText}
        </span>
      </Button>
      
    </form>
  )
}

