// src/components/form-fields/SelectField.jsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CustomKeySelectField = React.memo(
  ({
    id,
    name,
    label,
    value,
    onValueChange,
    error,
    options,
    placeholder,
    isRequired = false,
    customKeyFunction = null, // renamed from "key"
    disabled = false
  }) => {
    const hasError = !!error;

    return (
      <div className="space-y-2 w-full">
        <Label htmlFor={id}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <Select value={value} onValueChange={(val) => onValueChange(name, val)} disabled={disabled}>
          <SelectTrigger
            id={id}
            className={`w-full m-0 ${hasError ? "border-red-500" : ""}`}
            aria-invalid={hasError}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => {
              const generatedKey = customKeyFunction(option) || index;
              
              const optionValue = option.tipo_accion?.trim() || option.tipo_viaje?.trim() || option.tipo_contacto?.trim();

              return (
                <SelectItem
                  key={generatedKey}
                  value={optionValue}
                >
                  {option.descripcion}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <input type="hidden" name={name} value={value || ""} />

        {hasError && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

