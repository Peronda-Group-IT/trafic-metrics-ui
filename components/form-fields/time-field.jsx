"use client";

import React, { useCallback } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

// Generate time options once for all instances
const TIME_OPTIONS = Array.from({ length: 96 }, (_, i) => {
  const hours = Math.floor(i / 4);
  const minutes = (i % 4) * 15;
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return { value: timeString, label: timeString };
});

export const TimeField = React.memo(function TimeField({
  id,
  name,
  label,
  value,
  onValueChange,
  error,
  placeholder = "Seleccione hora",
  isRequired = false,
  disabled = false,
}) {
  const hasError = !!error;

  // 🧠 Memoized handler
  const handleChange = useCallback(
    (val) => onValueChange?.(name, val),
    [name, onValueChange]
  );

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>

      <Select value={value} onValueChange={handleChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          className={clsx("w-full", hasError && "border-red-500")}
          aria-invalid={hasError}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {TIME_OPTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input type="hidden" id={id} name={name} value={value || ""} />

      {hasError && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

// Add a display name for better debugging
TimeField.displayName = "TimeField";
