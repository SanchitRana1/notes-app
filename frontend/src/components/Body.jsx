import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import { Link, useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";
import { useSelector } from "react-redux";
// import { notes } from "../../../backend/data/notes";

const Body = () => {
  const [myNotes, setMyNotes] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.user); //get user info from store

  const getMyNotes = async () => {
    const data = await fetch("http://localhost:5000/api/notes");
    const json = await data.json();
    setMyNotes(json);
  };

  const checkUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? true : false;
  };

  useEffect(() => {
    if (checkUserInfo()) {
      getMyNotes();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col mb-20">
      <MainContainer title={"Welcome Back " + userInfo?.data.name}>
        <div className="">
          {/* <Link className="ms-10 min-w-fit" to={"/createnote"}> */}
          <button
            className=" bg-blue-800 py-2 px-6 m-2 rounded-lg font-semibold text-xs font-mono hover:shadow-white hover:bg-blue-900 text-white"
            onClick={() => {
              navigate("/createnote");
            }}
          >
            CREATE NEW NOTE
          </button>
          {/* </Link> */}
        </div>
        {myNotes.map((n) => (
          <NoteCard key={n._id} note={n} />
        ))}
      </MainContainer>
    </div>
  );
};

export default Body;
