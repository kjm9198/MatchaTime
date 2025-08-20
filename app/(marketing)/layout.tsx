import { Navbar } from "./_components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const MarketingLayout = ({
                           children
                         }: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg-[#97bf88] dark:bg-[#1d3d22] dark:bg-opacity-100">
      <Navbar />
      <ClerkProvider>
      <main className="h-full pt-40">
        {children}
      </main>
      </ClerkProvider>
    </div>
  );
};

export default MarketingLayout;