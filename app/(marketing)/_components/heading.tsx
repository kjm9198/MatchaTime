"use client";

import {Button} from "@/components/ui/button";
import {ArrowRightIcon} from "lucide-react";

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
                Your Imagination, Documents & Plans. All in one place. Welcome to
                <span className=""> TimeScript</span>.
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                TimeScript is a simple way to keep a connected workspace in sync with time.
            </h3>
            <Button>
                Enter TimerScript
                <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
}