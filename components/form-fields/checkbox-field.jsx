// src/components/form-fields/CheckboxField.jsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const CheckboxField = React.memo(({ id, name, label, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox checked={checked} onCheckedChange={(val) => onCheckedChange(name, val)} />
      <Label htmlFor={id}>{label}</Label>
      <input type="checkbox" id={id} name={id} defaultChecked={checked} className="hidden"></input>
    </div>
  );
});

CheckboxField.displayName = "CheckboxField";