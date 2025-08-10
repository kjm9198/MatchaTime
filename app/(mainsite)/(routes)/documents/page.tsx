"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled Matcha" });

    toast.promise(promise, {
      loading: "Creating a New Matcha Note...",
      success: "New Matcha Note Created!",
      error: "Failed to Create a New Matcha Note."
    })
  }

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
      <h3 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Matcha Page
      </h3>
      <Button onClick={onCreate}>
        <PlusCircleIcon className="h-4 w-4 mr-2" />
        Create a Matcha Page
      </Button>
    </div>
  );
};

export default DocumentsPage;