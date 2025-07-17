"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Bold, Italic, UnderlineIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";

function cleanHtmlAttributes(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.body.querySelectorAll("*").forEach((el) => {
    [...el.attributes].forEach((attr) => el.removeAttribute(attr));
  });
  return doc.body.innerHTML;
}

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const buttons = [
    { cmd: "bold", icon: <Bold /> },
    { cmd: "italic", icon: <Italic /> },
    { cmd: "underline", icon: <UnderlineIcon /> },
  ];

  return (
    <div className="bg-white border rounded-md p-1 flex gap-2 w-full">
      {buttons.map(({ cmd, icon }) => {
        const method = `toggle${cmd[0].toUpperCase() + cmd.slice(1)}`;
        return (
          <Button
            key={cmd}
            type="button"
            size="icon"
            variant="ghost"
            className={cn(
              "transition-colors",
              editor.isActive(cmd) && "bg-black text-white"
            )}
            onClick={() => editor.chain().focus()[method]().run()}
            disabled={!editor.can().chain().focus()[method]().run()}
            aria-pressed={editor.isActive(cmd)}
          >
            {icon}
          </Button>
        );
      })}
    </div>
  );
};

export default function FormattedTextarea({
  id,
  name,
  label,
  value = "",
  onChange,
}) {
  const onChangeRef = useRef(onChange);
  const lastValueRef = useRef(value);
  const [htmlValue, setHtmlValue] = useState(value);
  const [debouncedHtmlValue] = useDebounce(htmlValue, 300);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (debouncedHtmlValue !== lastValueRef.current) {
      onChangeRef.current?.({ target: { name, value: debouncedHtmlValue } });
      lastValueRef.current = debouncedHtmlValue;
    }
  }, [debouncedHtmlValue, name]);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        paragraph: {
          HTMLAttributes: { margin: "0" },
        },
      }),
      Underline,
    ],
    []
  );

  const editor = useEditor({
    extensions,
    content: cleanHtmlAttributes(value || ""),
    editorProps: {
      attributes: {
        class:
          "border rounded-lg p-4 min-h-[150px] focus:outline-none prose prose-sm max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      setHtmlValue(editor.getHTML());
    },
  });

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id} className="mb-2 block">
          {label}
        </Label>
      )}
      <Toolbar editor={editor} />
      <div className="h-2" />
      <EditorContent editor={editor} />
      <input
        className="hidden"
        id={id}
        name={name}
        value={value || ""}
        readOnly
      />
    </div>
  );
}
