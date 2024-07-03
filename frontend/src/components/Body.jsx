import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import {useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../utils/noteSlice";
import NoteContainer from "./NoteContainer";
import Loader from "./Loader";
const Body = ({search}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((store) => store.user); //get user info from store

  const [loading, setLoading] = useState(false)
  const checkUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? true : false;
  };
  useEffect(() => {
    if (checkUserInfo()) {
      setLoading(true);
      dispatch(fetchNotes());
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col mb-20">
      <MainContainer title={"Welcome Back " + userInfo?.name}>
        <div className="">
          <button
            className=" bg-blue-800 py-2 px-6 m-2 rounded-lg font-semibold text-xs font-mono hover:shadow-white hover:bg-blue-900 text-white"
            onClick={() => {
              navigate("/createnote");
            }}
          >
            CREATE NEW NOTE
          </button>
        </div>
        
      {loading && <Loader />}
        <NoteContainer search={search}/>
      </MainContainer>
    </div>
  );
};

export default Body;
