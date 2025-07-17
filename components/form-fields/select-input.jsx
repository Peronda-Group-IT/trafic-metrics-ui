"use client"

import React, { useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
// import { useDebounce } from "@/hooks/use-debounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const SelectInput = React.memo(
  ({
    id,
    name,
    label,
    value,
    onChange,
    error,
    options = [],
    placeholder = "Select...",
    isRequired = false,
    className,
    searchPlaceholder,
    disabled = false
  }) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    // const debouncedSearchValue = useDebounce(searchValue, 300);

    const filteredOptions = useMemo(() => {
      // console.log("Calculating filteredOptions, searchValue:", searchValue); // Debug log
      if (!searchValue) {
        return [];
      }
      const lowerCaseSearch = searchValue.toLowerCase();
      const results = options.filter((option) => {
        if (id === "viaje") {
          return option.titulo?.toLowerCase().includes(lowerCaseSearch);
        }
        return option.nombre?.toLowerCase().includes(lowerCaseSearch);
      });
      // console.log("Filtered results:", results); // Debug log
      return results;
    }, [searchValue, options]);

    const selectedOptionDisplay = useMemo(() => {
        return options.find((option) => option.id === value);
    }, [value, options]);

    return (
        <>
        
        <div className="flex flex-col gap-2">
            {label && (
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
                {isRequired && <span className="text-red-500"> *</span>}
            </label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn("w-full justify-between ", className)}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id}-error` : undefined}
                  disabled={disabled}
                  >
                  {selectedOptionDisplay ? (id === "viaje" ? selectedOptionDisplay.titulo : selectedOptionDisplay.nombre) : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-[--radix-popover-trigger-width] p-0", className)} align="start">
                {/* --- !! CAMBIO PRINCIPAL AQUÍ !! --- */}
                <Command shouldFilter={false}>
                <CommandInput
                    placeholder={searchPlaceholder || `Buscar ${label?.toLowerCase() || 'opción'}...`}
                    value={searchValue}
                    onValueChange={setSearchValue}
                />
                <CommandList>
                    {/* Mostramos CommandEmpty SÓLO si nuestra lista filtrada está vacía Y hay texto de búsqueda */}
                    {/* O si no hay opciones en absoluto */}
                    <CommandEmpty>
                        {options.length === 0
                        ? "No hay opciones disponibles."
                        : searchValue && filteredOptions.length === 0
                        ? "No se encontraron resultados."
                        : null /* No mostrar nada si hay resultados o si no se ha buscado */
                        }
                    </CommandEmpty>
                    {/* Renderizamos el grupo sólo si hay opciones filtradas */}
                    {filteredOptions.length > 0 && (
                        <CommandGroup>
                        {filteredOptions.map((option) => (
                            <CommandItem
                            key={option.id}
                            value={String(option.id)} // El valor interno sigue siendo el ID
                            onSelect={(currentValue) => {
                                if (!disabled) {
                                    onChange({ target: { name, value: currentValue === value ? "" : currentValue } });
                                    setOpen(false);
                                    setSearchValue("");
                                }
                            }}
                            disabled={disabled}
                            >
                            <Check
                                className={cn(
                                "mr-2 h-4 w-4",
                                value === option.id ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {id === "viaje" ? option.titulo : option.nombre}
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    )}
                </CommandList>
                </Command>
            </PopoverContent>
            </Popover>
            {error && <p id={`${id}-error`} className="text-sm text-red-500">{error}</p>}
        </div>
        <input type="hidden" id={id} name={name} value={value} />
        </>
    );
  }
);

SelectInput.displayName = "SelectInput";