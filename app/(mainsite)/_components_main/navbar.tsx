"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import { Title } from "@/app/(mainsite)/_components_main/title";
import { Banner } from "@/app/(mainsite)/_components_main/banner";
import { Menu } from "@/app/(mainsite)/_components_main/menu";
import { Publish } from "@/app/(mainsite)/_components_main/publish";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}



export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const fire = (type: "summarize" | "generate") => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("matcha:editor-action", { detail: { type } }));
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
            <Button size="sm" className="bg-[#43734a] dark:bg-[#0e2912] dark:text-white hover:text-black hover:bg-[#c1d9c4] dark:hover:bg-[#1d3d22]" onClick={() => fire("generate")}>
              MatchAI
            </Button>
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