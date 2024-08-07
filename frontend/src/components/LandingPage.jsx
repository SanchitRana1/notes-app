import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCheckUserInfo from "../hooks/useCheckUserInfo";
import { BG_HOME } from "../utils/constants";

const LandingPage = () => {
  const navigate = useNavigate();
  const userAvailable = useCheckUserInfo();

  useEffect(() => {
    if (userAvailable) {
      navigate("/mynotez");
    }
  }, []);

  return (
    <div className="h-[100%]">
      <div className="w-full h-[100%] flex justify-center">
        <div className="w-full h-full fixed bg-gray-600 -z-10">
          <img
            className="w-full h-full object-cover"
            src={BG_HOME}
            alt=""
          />
        </div>
        <div className="w-[100%] bg-black bg-opacity-50 text-white flex flex-col items-center justify-center my-52">
          <h1 className="text-4xl md:text-7xl">Welcome to Notez</h1>
          <p>One safe place for all your notes</p>
          <div className="p-4 flex">
            <button
              className="w-40 bg-blue-800 py-2 px-6 m-2 rounded-lg font-semibold text-xs font-mono hover:shadow-white hover:bg-blue-900"
              onClick={() => {
                navigate("/login");
              }}
            >
              LOGIN
            </button>
            <button
              className="w-40 text-blue-800 py-2 px-6 m-2 rounded-lg font-semibold text-xs font-mono bg-white   hover:bg-gray-200"
              onClick={() => {
                navigate("/register");
              }}
            >
              SIGNUP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
