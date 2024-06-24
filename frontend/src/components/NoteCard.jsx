import React, { useState } from "react";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  const [accOpen, setAccOpen] = useState(false);
  const today = new Date();
  return (
    <div className="ms-10 w-[80%] my-1 shadow-md rounded-md">
      <div
        className="bg-gray-200  flex items-center py-2 px-4  justify-between rounded-t-md cursor-pointer"
        onClick={() => {
          setAccOpen(!accOpen);
          console.log(accOpen);
        }}
      >
        <div className=" rounded-md font-bold">{note?.title}</div>
        <div className="flex">
          <Link to={"/mynotez/" + note?._id}>
            <button className="bg-blue-800 font-semibold text-xs font-mono hover:bg-blue-900 text-white px-2 py-1 rounded-md mx-1">
              EDIT
            </button>
          </Link>
          <button className="bg-red-700 font-semibold text-xs font-mono hover:bg-red-900 text-white px-2 py-1 rounded-md mx-1">
            DELETE
          </button>
        </div>
      </div>
      {accOpen && (
        <div className="bg-gray-50 py-2 px-4 rounded-md ease-in-out">
          <span className="bg-green-600 text-white text-xs font-semibold p-1 rounded-md">
            Category - {note?.category}
          </span>
          <p className="rounded-full mt-2"> {note?.content}</p>
          <p className="text-xs text-gray-400 mx-2 mt-2">
            ~ {today.toUTCString().substring(0, 16)}
          </p>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
