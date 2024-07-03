import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCheckUserInfo from "../hooks/useCheckUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { clearNotes } from "../utils/noteSlice";
const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAvailable = useCheckUserInfo();
  const [showProfileOp, setShowProfileOp] = useState(false);

  const { userInfo } = useSelector((store) => store?.user);

  const onLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeUser());
    dispatch(clearNotes());
    navigate("/");
  };

  const toggleProfile = () => {
    setShowProfileOp(!showProfileOp);
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
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {userAvailable ? (
          <div className="flex end text-white justify-center items-center">
            <Link className="cursor-pointer px-2" to={"/mynotez"}>
              {" "}
              My notes
            </Link>
            <div className="mx-2">
              <div className="flex items-center px-2 py-1 cursor-pointer" 
                  onClick={toggleProfile}
                  tabIndex="0"
                  >
                <img
                  className="rounded-full w-8"
                  src={userInfo?.pic}
                  alt=""
                />
                <div className="p-2">{userInfo?.name}</div>
              </div>
              {showProfileOp && (
                <div className="flex flex-col text-center ms-2 rounded-b-md absolute bg-white text-fuchsia-500 shadow-lg">
                  <Link to={"/profile"} onClick={()=>{setShowProfileOp(false)}} className="px-4 py-1 hover:bg-fuchsia-500 hover:text-white">
                    My Profile
                  </Link>
                  <button
                    className="px-4 py-1 hover:bg-fuchsia-500 hover:text-white"
                    onClick={()=>{
                      onLogout()
                      setShowProfileOp(false)}}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
