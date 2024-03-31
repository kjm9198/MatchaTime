"use client";

import {useScrollTop} from "@/hooks/use-scroll-top";
import {cn} from "@/lib/utils";
import {Logo} from "@/app/(marketing)/_components/logo";
import {ModeToggle} from "@/components/mode-toggle";
import {useConvexAuth} from "convex/react";
import {SignInButton} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button";

export const Navbar = () => {
    const scrolled = useScrollTop();
    const {isAuthenticated, isLoading} = useConvexAuth();
    return (
        <div className={cn(
            "z-50 bg-background dark:bg-black fixed top-0 flex items-center w-full px-6 py-4",
            scrolled && "bg-background shadow-md"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <div className="animate-pulse w-20 h-8 bg-background dark:bg-gray-800 rounded-full">
                    Loading...
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
                            <Button size="sm">
                                Sign up
                            </Button>
                        </SignInButton>
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}