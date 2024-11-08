import {Navbar} from "./_components/navbar";

const MarketingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full bg-[#B0CE85] dark:bg-black">
            <Navbar />
            <main className="h-full pt-40">
                {children}

            </main>
        </div>
    );
}

export default MarketingLayout;