import React, { useEffect } from "react";

const Footer = () => {
  return (
    <div className="w-full p-2 fixed bottom-0 flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-opacity-100">
      <span className="text-md text-white text-center w-full">
        Copyright &copy; Notezz
      </span>
    </div>
  );
};

export default Footer;
