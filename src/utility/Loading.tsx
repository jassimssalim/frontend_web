import React from "react";

const Loading = () => {
  return (
    <div>
      <div className=" w-full h-full fixed block top-0 left-0 bg-purple-600 bg-opacity-20 flex items-center justify-center ">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <h1 className="text-lg font-bold">MoodSnap.</h1>
      </div>
    </div>
  );
};

export default Loading;
