"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { ChevronDown, Search, XIcon } from "lucide-react";
import { Popover } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { useT } from "@/contexts/TranslationContext";

export default function MultipleSelector({
  label,
  id,
  value,
  isRequired = false,
  error,
  disabled = false,
  providerFunction = null,
  rerenderTrigger = null,
}) {

  const { t } = useT();
  const [tags, setTags] = useState([]);
  const [selectedElements, setSelectedElements] = useState(value || []);
  const [listVisible, setListVisible] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState(undefined);
  const buttonRef = useRef(null);

  useEffect(() => {
    
    if (rerenderTrigger && selectedElements.length > 0 && selectedElements[0].compania_codigo !== rerenderTrigger) {
      setSelectedElements([]);
    }
    const fetchItems = async () => {
      const newTags = await providerFunction(rerenderTrigger);
      setTags(newTags);
    }

    fetchItems();

  }, [rerenderTrigger]);

  useEffect(() => {
    if (buttonRef.current) {
      setPopoverWidth(buttonRef.current.offsetWidth);
    }
  }, [listVisible]);

  const handleAddElement = (element) => {
    const newSelectedElements = [...selectedElements, element];
    setSelectedElements(newSelectedElements);
  };

  const handleRemoveElement = (element) => {
    const newSelectedElements = selectedElements.filter(
      (el) => el.name !== element.name
    );
    setSelectedElements(newSelectedElements);
  };

  const handleElementClick = (element) => {
    if (selectedElements.some((e) => e.name === element.name)) {
      handleRemoveElement(element);
    } else {
      handleAddElement(element);
    }
  };

  const hasError = !!error;
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <Popover open={listVisible} onOpenChange={setListVisible}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              ref={buttonRef}
              type="button"
              variant={"outline"}
              className="-z-10 w-full h-fit py-2 border flex items-center px-2 justify-between"
            >
              <ul className="flex rlex-row gap-2 flex-wrap">
                {selectedElements?.length > 0 ? (
                  selectedElements.map((el, i) => (
                    <li
                      key={i}
                      className="bg-foreground rounded-md text-accent px-2 flex items-center gap-2"
                    >
                      <span>{el.name}</span>
                    </li>
                  ))
                ) : (
                  <span className={`${disabled ? "" : "text-foreground/60"}`}>
                    {disabled
                      ? t('action_form_contacts_selectcompanyfirst')
                      : t('action_form_contacts_placeholder')}
                  </span>
                )}
              </ul>
              <div className="w-6">
                <ChevronDown className="h-6 w-6" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            style={popoverWidth ? { width: popoverWidth } : {}}
            className="p-2"
          >
            <ul className="flex flex-row gap-2 flex-wrap">
              {tags?.length > 0 ? (
                tags.map((tag, index) => (
                <li
                  key={index}
                  className={`${
                    selectedElements.some((el) => el.name === tag.name)
                      ? "bg-foreground"
                      : "bg-background text-accent-foreground"
                  } rounded-md text-accent px-2 flex items-center gap-2 cursor-pointer border`}
                  onClick={() => handleElementClick(tag)}
                >
                  <span>{tag.name}</span>
                </li>
              ))
              ) : (
                <p className="text-foreground/60">{t('action_form_contacts_empty')}</p>
              )}
            </ul>
          </PopoverContent>
        </Popover>

        {hasError && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <input className="hidden" value={JSON.stringify(selectedElements)} name={id} id={id} readOnly></input>
    </>
  );
}
