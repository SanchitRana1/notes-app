import React from "react";

const MainContainer = ({ title, children }) => {
  return (
    <div className="flex flex-col w-[70%] h-[50%] py-20 ms-10 justify-center ">
      {title && (
        <div className="">
          <h1 className="p-2 text-3xl md:text-5xl font-mono">
            {title.toUpperCase()}
          </h1>
          <hr />
        </div>
      )}
      {children}
    </div>
  );
};

export default MainContainer;
