// src/components/form-fields/SelectField.jsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SelectField = React.memo(
  ({
    id,
    name, // The name prop is crucial here
    label,
    value, // The selected value
    onValueChange,
    error,
    options,
    placeholder,
    isRequired = false,
    key = null,
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
            className={`w-full m-0 ${hasError ? "border-red-500" : ""}`} // Using clsx is cleaner
                 aria-invalid={hasError}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={key ? key : option.id ? option.id : index} value={option.id?.trim()}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* *** ADD THIS HIDDEN INPUT *** */}
        <input type="hidden" name={name} value={value || ""} />
        {/* ***************************** */}

        {hasError && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

