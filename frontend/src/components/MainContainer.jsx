import React from "react";

const MainContainer = ({ title, children }) => {
  return (
    <div className="md:w-[50%] h-[50%] py-20 mx-2">
      {title && (
        <div className="flex flex-col">
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
