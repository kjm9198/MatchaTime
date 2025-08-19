"use client";

import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

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

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: handleUpload
  });

  // Define light and dark theme objects
  const lightTheme = {
    colors: {
      editor: {
        background: "#B0CE85",
        text: "#000000"
      },
      menu: {
        background: "#B0CE85",
        text: "#000000"
      },
      tooltip: {
        background: "#000000",
        text: "#B0CE85"
      }
    }
  };

  const darkTheme = {
    colors: {
      editor: {
        background: "#2D502B",
        text: "#FFFFFF"
      },
      menu: {
        background: "#2D502B",
        text: "#FFFFFF"
      },
      tooltip: {
        background: "#FFFFFF",
        text: "#2D502B"
      }
    }
  };
  const customTheme = resolvedTheme === "dark" ? darkTheme : lightTheme;

  return (
    <div
      style={{ minHeight: "100vh", overflowY: "auto" }}
    >
      <BlockNoteView
        editable={editable}
        editor={editor}
        onChange={() => {
          onChange(JSON.stringify(editor.document));
        }}
        theme={resolvedTheme === "dark" ? darkTheme : lightTheme}
      />
    </div>
  );
};

export default Editor;