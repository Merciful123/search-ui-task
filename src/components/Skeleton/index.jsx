const Skeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3]?.map((i) => (
      <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
