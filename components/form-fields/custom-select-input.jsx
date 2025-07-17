'use client'

import { useState, useRef, useEffect, Suspense } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Search } from "lucide-react";
import SelectInputContent from "../select-input-content";
import { useDebounce } from "use-debounce";
import { getCompanyById } from "@/lib/company-utils";
import { getTripById } from "@/lib/trip-utils";

export default function CustomSelectInput({
    id,
    name,
    label,
    selected,
    onChange,
    error,
    placeholder = "Select...",
    isRequired = false,
    searchPlaceholder,
    disabled = false,
    fetchItems,
    shouldShrink = false,
    showDefaultOnEmpty = false
}){

    const [searchValue, setSearchValue] = useState("");
    const [value, setValue] = useState(selected);
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    const [popoverWidth, setPopoverWidth] = useState(undefined);
    const [debouncedSearch] = useDebounce(searchValue, 500);
    const [itemsPromise, setItemsPromise] = useState(null)

    const hasError = !!error;

    useEffect(() => {
        if (buttonRef.current) {
            setPopoverWidth(buttonRef.current.offsetWidth);
        }
    }, [open]);


    useEffect(() => {

        const fetchCompanyById = async() => {
            const companyData = await getCompanyById(selected)
            setText(companyData.nombre)
        }

        const fetchTripById = async() => {
            const companyData = await getTripById(selected)
            setText(companyData?.titulo)
        }

        if (selected){
            if (name === 'viaje'){
                fetchTripById()
            } else {
                fetchCompanyById()
            }
        }
    }, [id])

    const handleSetValue = (element) => {
        setSearchValue('')
        setText(element.text)
        setValue(element.id)
        setOpen(false)
        onChange({ target: { name, value: element.id } });
    }

    useEffect(() => {
        setItemsPromise(fetchItems(debouncedSearch))
    }, [debouncedSearch])

    return(
        <>
        <div className="flex flex-col gap-2 w-full">
            <div className="flex">
                {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                    {isRequired && <span className="text-red-500"> *</span>}
                </label>
                )}
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                <Button
                    ref={buttonRef}
                    variant="outline"
                    disabled={disabled}
                    className={`w-full flex justify-start ${shouldShrink ? 'max-w-3xs' : ''} md:max-w-full ${hasError ? 'border-red-500' : ''}`}
                    >
                    <span className="truncate w-full text-left">
                        {text || placeholder}
                    </span>
                </Button>
                </PopoverTrigger>
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <PopoverContent style={popoverWidth ? { width: popoverWidth } : {}} className="p-1">
                    <div className="flex flex-row gap-2 items-center">
                        <Search className="text-gray-400 h-4"/>
                        <input
                            name={"select-input-search"}
                            value={searchValue}
                            className="w-full h-8
                            selected:outline-none
                            selected:ring-0  
                            focus:outline-none 
                            focus:ring-0"
                            autoComplete="off"
                            placeholder={searchPlaceholder}
                            onChange={(e) => setSearchValue(e.target.value)}

                        />
                    </div>
                    <div className={`h-px w-full bg-gray-200 my-1 ${debouncedSearch ? '' : 'hidden'}`}></div>

                    <SelectInputContent itemsPromise={itemsPromise} setValue={handleSetValue} search={debouncedSearch} showDefaultOnEmpty={showDefaultOnEmpty}/>
 
                
                </PopoverContent>
            </Popover>
            <input className="hidden" value={value} name={name} id={id} readOnly></input>
        </div>
        </>
    )
}