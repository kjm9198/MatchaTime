"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  return (
    <div className="max-w-3xl bg-[#97bf88] dark:bg-[#1d3d22] space-y-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white">
        Your Imagination, Documents & Plans. All in one place. Welcome to
        <span className=""> MatchaTime</span>.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium text-white">
        MatchaTime is a simple way to keep a connected workspace in sync with time while sipping on Matcha.
      </h3>
      <Button asChild
              className="bg-white text-black dark:text-[#0e2912] hover:bg-[#43734a] dark:hover:bg-[#0e2912] dark:hover:text-white">
        <Link href="/documents">
          Enter MatchaTime
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
};