"use client";

import Image from "next/image";
// import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const DocumentsPage = () => {

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/Drawing_Images/Studying2.png"
                height="300"
                width="300"
                alt="Studious Drawing"
                className="dark:hidden"
            />
            <Image
                src="/Drawing_Images/Studying2.png"
                height="300"
                width="300"
                alt="Studious Drawing"
                className="hidden dark:block"
            />
            <h3>
                Welcome to Your Main Matcha Page
            </h3>
            <Button>
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                Create a Matcha Page
            </Button>
        </div>
    );
};

export default DocumentsPage;