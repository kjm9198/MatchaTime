import { Navbar } from "./_components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const MarketingLayout = ({
                           children
                         }: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg-[#B0CE85] dark:bg-[#2D502B]">
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