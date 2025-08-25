"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon, ArrowRight, MoreHorizontal } from "lucide-react";
import { Title } from "@/app/(mainsite)/_components_main/title";
import { Banner } from "@/app/(mainsite)/_components_main/banner";
import { Menu } from "@/app/(mainsite)/_components_main/menu";
import { Publish } from "@/app/(mainsite)/_components_main/publish";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Spinner } from "@/app/(marketing)/_components/spinner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const fire = (type: "summarize" | "generate", prompt?: string) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("matcha:editor-action", { detail: { type, prompt } })
    );
    if (type === "generate") {
      setIsGenerating(true);
    } else {
      setIsSummarizing(true);
    }
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

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-x-2">
            <Popover open={aiOpen} onOpenChange={setAiOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  disabled={isGenerating || isSummarizing}
                  className="bg-[#43734a] dark:bg-[#0e2912] dark:text-white hover:text-black hover:bg-[#c1d9c4] dark:hover:bg-[#1d3d22]"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" />
                      Generating...
                    </div>
                  ) : (
                    "MatchAI"
                  )}
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
                      disabled={isGenerating || isSummarizing}
                    />
                    <Button
                      size="icon"
                      disabled={isGenerating || isSummarizing}
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

            <Button
              size="sm"
              disabled={isGenerating || isSummarizing}
              className="bg-[#43734a] dark:bg-[#0e2912] dark:text-white hover:text-black hover:bg-[#c1d9c4] dark:hover:bg-[#1d3d22]"
              onClick={() => fire("summarize")}
            >
              {isSummarizing ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  Summarizing...
                </div>
              ) : (
                "Summarize"
              )}
            </Button>
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>

          {/* Mobile Dropdown */}
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => {
                    fire("generate", aiPrompt.trim());
                  }}
                >
                  {isGenerating ? "Generating..." : "MatchAI"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => fire("summarize")}>
                  {isSummarizing ? "Summarizing..." : "Summarize"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Publish initialData={document} />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Menu documentId={document._id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};
