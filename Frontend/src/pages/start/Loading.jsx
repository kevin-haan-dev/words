function Loading() {
  const loadingElements = 4;
  const loadingItemStyle = "rounded-full bg-white bg-opacity-20 h-10 w-10";
  const loadingBarStyle = "h-2 bg-white bg-opacity-20 rounded";

  return (
    <div className="m-auto flex flex-col">
      {[...Array(loadingElements)].map((_, index) => (
        <div
          key={index}
          className=" border-opacity-50 shadow-2xl rounded-md p-4 max-w-xl h-40 w-full mx-auto mb-10"
        >
          <div className="animate-pulse flex space-x-4">
            <div className={loadingItemStyle}></div>
            <div className={loadingItemStyle}></div>
            <div className="flex-1 space-y-6 py-1">
              <div className={loadingBarStyle}></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className={loadingBarStyle}></div>
                  <div className={`${loadingBarStyle} col-span-1`}></div>
                  <div className={`${loadingBarStyle} col-span-2`}></div>
                  <div className={`${loadingBarStyle} col-span-1`}></div>
                  <div className={loadingBarStyle}></div>
                  <div className={`${loadingBarStyle} col-span-1`}></div>
                </div>
                <div className={loadingBarStyle}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;
