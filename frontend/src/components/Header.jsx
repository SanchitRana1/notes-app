import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="w-[100%] md:w-[70%] mx-auto flex p-2 justify-between items-center">
        <div className="text-4xl font-bold text-white ">Notez</div>
        <div className="middle">
          <input
            className="rounded-lg outline-none shadow-lg py-1 px-2"
            type="text"
          />
        </div>
        <div className="end text-white">
          <Link to={"/mynotez"}> My notes</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
