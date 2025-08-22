"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon, ArrowRight } from "lucide-react";
import { Title } from "@/app/(mainsite)/_components_main/title";
import { Banner } from "@/app/(mainsite)/_components_main/banner";
import { Menu } from "@/app/(mainsite)/_components_main/menu";
import { Publish } from "@/app/(mainsite)/_components_main/publish";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}



export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const [aiPrompt, setAiPrompt] = useState("");
  const [aiOpen, setAiOpen] = useState(false);

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const fire = (type: "summarize" | "generate", prompt?: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("matcha:editor-action", { detail: { type, prompt } })
    );
  };

  if (document === undefined) {
    return (
      <nav className="bg-[#43734a] dark:bg-[#0e2912] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) return null;

  // @ts-ignore
  return (
    <>
      <nav className="bg-[#43734a] dark:bg-[#0e2912] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-heading"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Popover open={aiOpen} onOpenChange={setAiOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  className="bg-[#43734a] dark:bg-[#0e2912] dark:text-white hover:text-black hover:bg-[#c1d9c4] dark:hover:bg-[#1d3d22]"
                >
                  MatchAI
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" alignOffset={8} className="w-72 p-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#43734a] dark:text-white">
                    Enter a prompt
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          fire("generate", aiPrompt.trim());
                          setAiOpen(false);
                        }
                      }}
                      placeholder="Prompt..."
                      className="flex-1 h-8 rounded-md border px-2 text-sm bg-white dark:bg-[#153d1b] text-black dark:text-white placeholder:text-gray-400 outline-none"
                    />
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-[#43734a] dark:bg-[#0e2912] text-white hover:bg-[#1d3d22]"
                      onClick={() => {
                        fire("generate", aiPrompt.trim());
                        setAiOpen(false);
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button size="sm" className="bg-[#43734a] dark:bg-[#0e2912] dark:text-white hover:text-black hover:bg-[#c1d9c4] dark:hover:bg-[#1d3d22]" onClick={() => fire("summarize")}>
              Summarize
            </Button>
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};