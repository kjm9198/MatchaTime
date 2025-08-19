"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "@/app/(marketing)/_components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/app/(marketing)/_components/spinner";
import Link from "next/link";


interface NavbarProps {
  isCollapsed?: boolean,
  onResetWidth?: () => void
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const scrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div
      className={cn(
        "z-50 bg-[#2D502B] dark:bg-[#265934] fixed top-0 flex items-center w-full px-6 py-4",
        scrolled && "bg-[#2D502B] dark:bg-[#265934] shadow-md"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && (
          <div className="animate-pulse w-20 h-8 bg-background dark:bg-gray-800 rounded-full">
            <Spinner />
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Sign up</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href={"/documents"}>Enter MatchaTime</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
