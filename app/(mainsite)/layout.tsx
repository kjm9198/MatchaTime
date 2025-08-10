"use client";

import {useConvexAuth} from "convex/react";
import {Spinner} from "@/app/(marketing)/_components/spinner";
import {redirect} from "next/navigation";
import {Sidebar} from "@/app/(mainsite)/_components_main/sidebar";

const MainLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
  const {isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return(
        <div className="h-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
    )
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return(
      <div className="h-full flex bg-[#B0CE85] dark:bg-[#2D502B]">
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto">
          {children}
        </main>

      </div>
  );
}

export default MainLayout;