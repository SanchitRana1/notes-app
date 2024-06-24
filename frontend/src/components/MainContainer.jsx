import React from "react";

const MainContainer = ({ title, children }) => {
  return (
    <div className="flex-1 flex items-center mt-5 h-[50%] overflow-hidden">
      {title && (
        <div className="ms-10 w-[80%]">
          <h1 className="p-2 text-3xl md:text-5xl font-mono">{title}</h1>
          <hr />
        </div>
      )}
      {children}
    </div>
  );
};

export default MainContainer;
