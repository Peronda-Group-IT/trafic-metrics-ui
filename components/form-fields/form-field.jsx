// src/components/form-fields/FormField.jsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Use React.memo for potential performance optimization if needed
export const FormField = React.memo(
  ({
    id,
    name,
    label,
    value,
    onChange,
    error,
    type = "text", // Default to text input
    isRequired = false,
    componentType = "input", // 'input' or 'textarea'
    rows, // For textarea
    ...props // Pass extra props like placeholder, etc.
  }) => {
    const hasError = !!error;
    const InputComponent = componentType === "textarea" ? Textarea : Input;

    return (
      <>
      <div className="space-y-2 w-full">
        <Label htmlFor={id}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <InputComponent
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={type} // Only relevant for Input
          aria-invalid={hasError}
          className={hasError ? "border-red-500" : ""}
          rows={rows} // Only relevant for Textarea
          {...props}
          />
        {hasError && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <input type="text" id={id} name={name} defaultValue={value} className="hidden"></input>
      </>
    );
  }
);

FormField.displayName = "FormField"; // Helps in React DevTools