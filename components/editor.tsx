"use client";

import { useTheme } from "next-themes";
import type React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/style.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Button } from "@/components/ui/button";
import { useEffect, useCallback } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  const extractTextFromBlocks = (blocks: any[]): string => {
    if (!Array.isArray(blocks)) return "";
    return blocks
      .map((b: any) => Array.isArray(b?.content) ? b.content.map((c: any) => (typeof c?.text === "string" ? c.text : "")).join("") : "")
      .join("\n");
  };

  const getSelectedOrAllText = (ed: any): string => {
    const sel = ed?.getSelection?.();
    if (sel && Array.isArray(sel.blocks) && sel.blocks.length) {
      return extractTextFromBlocks(sel.blocks);
    }
    return extractTextFromBlocks(ed?.document || []);
  };

  const runAI = async (mode: "generate" | "summarize", text: string): Promise<string> => {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, mode })
      });
      const data = await res.json();
      return data?.content || "";
    } catch {
      return "";
    }
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload
  });


  const insertAtCursor = (text: string) => {
    const anchor = editor?.getTextCursorPosition?.()?.block ?? editor.document[editor.document.length - 1];
    editor.insertBlocks(
      [{ type: "paragraph", content: [text] }],
      anchor,
      "after"
    );
  };

  const handleGenerate = useCallback(async (userPrompt?: string) => {
    const seed = (userPrompt && userPrompt.trim()) || getSelectedOrAllText(editor) || "Write something helpful for the user.";
    const out = await runAI("generate", seed);
    if (!out) return;
    insertAtCursor(out);
  }, [editor]);

  const handleSummarize = useCallback(async () => {
    const txt = getSelectedOrAllText(editor);
    if (!txt) return;
    const out = await runAI("summarize", txt);
    if (!out) return;
    const sel = editor?.getSelection?.();
    if (sel && Array.isArray(sel.blocks) && sel.blocks.length) {
      editor.replaceBlocks(sel.blocks, [
        { type: "paragraph", content: [out] }
      ]);
    } else {
      editor.replaceBlocks(editor.document, [
        { type: "paragraph", content: [out] }
      ]);
    }
  }, [editor]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ type: "summarize" | "generate"; prompt?: string }>).detail;
      if (!detail) return;
      if (detail.type === "summarize") {
        void handleSummarize();
      } else if (detail.type === "generate") {
        void handleGenerate(detail.prompt);
      }
    };
    window.addEventListener("matcha:editor-action", handler as EventListener);
    return () => {
      window.removeEventListener("matcha:editor-action", handler as EventListener);
    };
  }, [handleGenerate, handleSummarize]);

  const lightVars = {
    ["--bn-colors-editor-background" as any]: "#B0CE85",
    ["--bn-colors-editor-text" as any]: "#000000",
    ["--bn-colors-menu-background" as any]: "#B0CE85",
    ["--bn-colors-menu-text" as any]: "#000000",
    ["--bn-colors-tooltip-background" as any]: "#000000",
    ["--bn-colors-tooltip-text" as any]: "#B0CE85"
  } as React.CSSProperties;

  const darkVars = {
    ["--bn-colors-editor-background" as any]: "#2D502B",
    ["--bn-colors-editor-text" as any]: "#FFFFFF",
    ["--bn-colors-menu-background" as any]: "#2D502B",
    ["--bn-colors-menu-text" as any]: "#FFFFFF",
    ["--bn-colors-tooltip-background" as any]: "#FFFFFF",
    ["--bn-colors-tooltip-text" as any]: "#2D502B"
  } as React.CSSProperties;

  let level = 0;

  return (
    <div
      className="matcha-editor"
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        ...(resolvedTheme === "dark" ? darkVars : lightVars)
      }}
    >
      {/*<div className="flex gap-2 p-2">*/}
        {/*<Button*/}
        {/*  style={{*/}
        {/*    paddingRight: level ? `${level*12 + 150 + 12}px` : undefined*/}
        {/*  }}*/}
        {/*  size="sm" className="bg-[#43734a] dark:bg-[#0e2912] dark:text-white hover:text-black hover:bg-[#c1d9c4] dark:hover:bg-[#1d3d22]"*/}
        {/*  onClick={handleGenerate}*/}
        {/*  aria-label="AI Generate"*/}
        {/*  title="AI"*/}
        {/*>*/}
        {/*  MatchAI*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*  style={{*/}
        {/*    paddingRight: level ? `${level*12 + 150 + 12}px` : undefined*/}
        {/*  }}*/}
        {/*  size="sm" className="bg-[#43734a] dark:bg-[#0e2912] dark:text-white  hover:text-black hover:bg-[#c1d9c4] dark:hover:bg-[#1d3d22]"*/}
        {/*  onClick={handleSummarize}*/}
        {/*  aria-label="Summarize"*/}
        {/*  title="Summarization"*/}
        {/*>*/}
        {/*  Summarize Matcha*/}
        {/*</Button>*/}
      {/*</div>*/}
      <BlockNoteView
        editable={editable}
        editor={editor}
        onChange={() => {
          onChange(JSON.stringify(editor.document));
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;