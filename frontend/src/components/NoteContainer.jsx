import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { useDispatch, useSelector } from "react-redux";

const NoteContainer = ({search}) => {
  const [myNotes, setMyNotes] = useState([]);
  const notesList = useSelector((store) => store?.note?.notes);

  const { userInfo } = useSelector((store) => store.user);
    const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    setMyNotes(notesList);
    
    setLoading(false);
  }, [dispatch, notesList, userInfo]);
  return (
    <div>
      <div className="flex flex-col-reverse">
        {myNotes &&
          myNotes.length > 0 &&
          myNotes?.filter(i=>i.title.toLowerCase().includes(search)).map((n) => <NoteCard key={n._id} note={n} />)}
      </div>
    </div>
  );
};

export default NoteContainer;
