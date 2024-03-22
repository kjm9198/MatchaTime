const RootLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full bg-green-400 text-white">
            {children}
        </div>
    );
}

export default RootLayout;