import { Logo } from "@/app/(marketing)/_components/logo";
import {Button} from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-[#43734a] dark:bg-[#0e2912] z-50">
      <Logo />
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
          <Button variant="ghost" size="sm" className="text-black dark:text-white hover:bg-[#97bf88] dark:hover:bg-[#1d3d22]">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm" className="text-black dark:text-white hover:bg-[#97bf88] dark:hover:bg-[#1d3d22]">
            Terms of Service
          </Button>
        </div>
    </div>
  );
};
