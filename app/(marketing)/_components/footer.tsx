import { Logo } from "@/app/(marketing)/_components/logo";
import {Button} from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-[#2D502B] dark:bg-[#B0CE85] z-50">
      <Logo />
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
          <Button variant="ghost" size="sm">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm">
            Terms of Service
          </Button>
        </div>
    </div>
  );
};
