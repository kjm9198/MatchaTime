const PublicLayout = ({
                          children
                      }: {
    children: React.ReactNode;
}) => {
    return (
      <div className="h-full flex bg-[#97bf88] dark:bg-[#2D502B]">
            {children}
        </div>
    );
}

export default PublicLayout;