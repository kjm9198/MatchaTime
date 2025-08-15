"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// import { Toolbar } from "@/components/toolbar";
// import { Cover } from "@/components/cover";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({
                          params
                        }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  });

  if (document === undefined) {
    return (
      <div>
        Loading Matcha...
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      {/*<Cover url={document.coverImage} />*/}
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        {/*<Editor onChange={onChange} initialContent={document.content} />*/}
      </div>
    </div>
  );
};
export default DocumentIdPage;


