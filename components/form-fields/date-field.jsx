"use client";

import React from "react";
import { parse, format, isValid } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useT } from "@/contexts/TranslationContext";


export const DateField = React.memo(({ 
    id, 
    name, 
    label, 
    selected = null, 
    onSelect, 
    disabled = false, 
    isRequired = false,
    error = null,
    minDate = null,
    maxDate = null,
    placeholder = "Seleccionar fecha"
}) => {
    const hasError = !!error;

    const parsedDate = typeof selected === "string"
        ? parse(selected, "dd/MM/yyyy", new Date())
        : selected;

    const { t } = useT();

    const safeParsedDate = isValid(parsedDate) ? parsedDate : null;

    const calendarLocale = t('calendar_locale') === 'es' ? es : undefined;

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>
                {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button 
                        id={id} 
                        variant="outline" 
                        className={`w-full justify-start text-left font-normal ${hasError ? "border-red-500" : ""}`} 
                        disabled={disabled}
                        aria-invalid={hasError}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {safeParsedDate ? format(safeParsedDate, "dd/MM/yyyy", { locale: es }) : placeholder}

                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 flex">
                    <Calendar 
                        mode="single" 
                        selected={safeParsedDate} 
                        onSelect={(date) => {
                            if (date) {
                                const formatted = format(date, "dd/MM/yyyy");
                                onSelect(name, formatted);
                            }
                        }} 
                        initialFocus 
                        locale={calendarLocale}
                        fromDate={minDate}
                        toDate={maxDate}
                    />
                </PopoverContent>
            </Popover>
            <input 
                id={id} 
                name={name} 
                type="text" 
                className="hidden" 
                value={safeParsedDate ? format(safeParsedDate, "dd/MM/yyyy") : ""} 
                readOnly
            />
            {hasError && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
});

DateField.displayName = "DateField";
