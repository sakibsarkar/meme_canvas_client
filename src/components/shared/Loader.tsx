const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={`py-20 flex justify-center items-center h-full w-full ${
        className || ""
      }`}
    >
      <div className="h-8 w-8 border-4 border-t-violet-600 animate-spin rounded-full"></div>
    </div>
  );
};

export default Loader;
