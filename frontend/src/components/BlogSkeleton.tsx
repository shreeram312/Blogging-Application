export const BlogSkeleton = () => {
  return (
    <div className="w-full md:w-2/3 px-4 p-6 border border-gray-200 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-6">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="flex flex-col flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <div className="h-2 w-2 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full animate-pulse mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
      </div>
    </div>
  );
};
