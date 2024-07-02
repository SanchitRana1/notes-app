import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCheckUserInfo from "../hooks/useCheckUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { clearNotes } from "../utils/noteSlice";
const Header = ({setSearch}) => {
  const navigate = useNavigate();
  const userAvailable = useCheckUserInfo();
  const dispatch = useDispatch();

  const {userInfo} = useSelector(store => store?.user) 

  const onLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeUser());
    dispatch(clearNotes());
    navigate("/");
  };

  return (
    <div className="w-full fixed bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="w-[100%] md:w-[80%] mx-auto flex p-2 justify-between items-center">
        <div className="text-4xl font-bold text-white cursor-pointer ">
          Notez
        </div>
        <div className="middle">
          <input
            className="rounded-lg outline-none shadow-lg py-1 px-2"
            type="text"
            onChange={(e)=>{setSearch(e.target.value)}}
          />
        </div>
        {userAvailable ? (
          <div className="flex end text-white justify-center items-center">
            <Link className="cursor-pointer px-2" to={"/mynotez"}>
              {" "}
              My notes
            </Link>
            <div className="w-8 mx-2">
            <img src={userInfo?.pic} alt="" />
            </div>
            <button
              className="cursor-pointer px-2 ms-2 hover:bg-white hover:text-purple-600 rounded-md"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="end text-white">
            <button
              className="cursor-pointer px-2 ms-2 hover:bg-white hover:text-purple-600 rounded-md"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
