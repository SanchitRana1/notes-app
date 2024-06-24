import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full p-2 fixed flex bottom-0 items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <span className="text-md text-white text-center w-full">
        Copyright &copy; Notezz
      </span>
      {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link href="#" className="hover:underline me-4 md:me-6">
            About
          </Link>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul> */}
    </div>
  );
};

export default Footer;
