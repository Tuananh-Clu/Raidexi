
export const Connector: React.FC = () => {
  return (
    <>
      <div className="hidden md:block flex-grow mx-4 mt-[72px] relative opacity-50">
        <div className="w-full h-px bg-primary" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-primary" />
      </div>
      <div className="relative flex justify-center flex-grow w-full h-16 my-4 opacity-50 md:hidden">
        <div className="w-px h-full bg-primary" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[4px] border-x-transparent border-t-[6px] border-t-primary" />
      </div>
    </>
  );
};