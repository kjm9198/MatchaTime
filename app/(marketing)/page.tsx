import React from "react";
import {Heading} from "@/app/(marketing)/_components/heading";
import {Heroes} from "@/app/(marketing)/_components/heroes";
import {Footer} from "@/app/(marketing)/_components/footer";
const MarketingPage = () => {
  return (
    <div className="min-h-full bg-[#97bf88] dark:bg-[#1d3d22] flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading/>
          <Heroes/>
      </div>
        <Footer/>
    </div>
  );
};

export default MarketingPage;
