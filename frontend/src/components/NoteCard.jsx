import React, { useState } from "react";
import Markdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import remarkBreaks from "remark-breaks";
import { deleteNote } from "../utils/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { NOTES_URL } from "../utils/constants";

const NoteCard = ({ note }) => {
  const newDate = new Date(note?.createdAt.substring(0, 10));
  const [accOpen, setAccOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store) => store.user);
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const showMessage = (message, state) => {
    closeSnackbar();
    enqueueSnackbar(message, {
      variant: state,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const onEditNote=()=>{
    navigate("/note/" + note?._id);
  }

  const onDeleteNote = async () => {
    if(window.confirm("Are your sure you want to delete this note ?")){

      const token = userInfo ? userInfo.token : "";
      const response = await fetch(
        NOTES_URL + note?._id,
        {
          method: "DELETE",
          headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const json = await response.json();
      const { data, result, status } = json;
      if (data) {
        dispatch(deleteNote(data));
        navigate("/mynotez");
      }
      showMessage(result, status);
    }
  };
  return (
    <div className="my-1 shadow-md rounded-md">
      <div
        className="bg-gray-200  flex items-center py-2 px-4 justify-between rounded-t-md cursor-pointer"
        onClick={() => {
          setAccOpen(!accOpen);
        }}
      >
        <div className=" rounded-md font-bold">{note?.title}</div>
        <div className="flex">
            <button className="bg-blue-800 font-semibold text-xs font-mono hover:bg-blue-900 text-white px-2 py-1 rounded-md mx-1" onClick={onEditNote}>
              EDIT
            </button>
          <button
            className="bg-red-700 font-semibold text-xs font-mono hover:bg-red-900 text-white px-2 py-1 rounded-md mx-1"
            onClick={onDeleteNote}
          >
            DELETE
          </button>
        </div>
      </div>
      {accOpen && (
        <div className="bg-gray-50 py-2 px-4 rounded-md ease-in-out">
          <span className="bg-green-600 text-white text-xs font-semibold p-1 rounded-md">
            Category - {note?.category}
          </span>
          <p className="rounded-full mt-2">
            <Markdown
              className="w-full px-2 mb-2 text-sm prose lg:prose-xl"
              remarkPlugins={[remarkBreaks]}
            >
              {note?.content}
            </Markdown>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            ~ Created on
            {" " + newDate.toUTCString().substring(0, 16)}
            {/* {note?.createdAt.substring(0, 10)} */}
          </p>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
