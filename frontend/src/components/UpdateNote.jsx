import React, { useEffect, useState } from 'react'
import MainContainer from './MainContainer'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { updateNote } from '../utils/noteSlice';
import Loader from './Loader';

const UpdateNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const { userInfo } = useSelector((store) => store.user);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const {id} = useParams()
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
    
    const token = userInfo ? userInfo.token : "";

    const getNoteInfo = async () => {
        setLoading(true)
      const response = await fetch("http://localhost:5000/api/notes/"+id, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      });
      const json = await response.json();
      const { data, result, status } = json;
      if (data) {
        setTitle(data?.title);
        setContent(data?.content);
        setCategory(data?.category);
    }
      showMessage(result, status);
      setLoading(false)
    };

    const updateNoteInfo = async () => {
        setLoading(true)
      const note = { title, content, category };
      const response = await fetch("http://localhost:5000/api/notes/" + id, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(note),
      });
      const json = await response.json();
      const { data, result, status } = json;
      if (data) {
        dispatch(updateNote(data));
        navigate("/mynotez")
      }
      showMessage(result, status);
      setLoading(false)
    };

    const onNoteSubmit=(e)=>{
        e.preventDefault()
        updateNoteInfo();
    }
    const onDeleteNote=()=>{}

    useEffect(() => {
        getNoteInfo();
    }, [])
    
  return (
    <div>
      <MainContainer title={"Edit Note"}>
        {loading && <Loader/> }
        <div className="0">
          <form
            className="p-2 m-2 bg-gray-10 shadow-lg"
            action=""
            onSubmit={onNoteSubmit}
          >
            <h1 className="font-semibold text-xl font-mono">Title</h1>
            <input
              className="w-full px-2 py-1 mb-2 bg-gray-100 rounded-md outline-none text-sm"
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <h1 className="font-semibold text-xl font-mono">Content</h1>
            <textarea
              className="w-full px-2 py-1 mb-2 bg-gray-100 rounded-md outline-none text-sm"
              placeholder="Enter the content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            {content && (
              <div className="rounded-md w-full">
                <h1 className="bg-gray-200 rounded-t-md p-1 font-semibold text-xl font-mono">
                  Note Preview
                </h1>
                <div className="w-full p-2 mb-2 rounded-b-md text-sm bg-gray-100 ">
                  <Markdown
                    className="prose lg:prose-xl overflow-auto"
                    remarkPlugins={[remarkBreaks]}
                  >
                    {content}
                  </Markdown>
                </div>
              </div>
            )}

            <h1 className="font-semibold text-xl font-mono">Category</h1>
            <input
              className="w-full px-2 py-1 mb-2 bg-gray-100 rounded-md outline-none text-sm"
              type="text"
              placeholder="Enter the category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />

            <div className="text-white my-2 text-sm font-mono font-semibold">
              <button
                className="py-1 px-2 m-1 bg-green-600 rounded-md"
                type="submit"
              >
                UPDATE NOTE
              </button>
              <button
                className="py-1 px-2 m-1 bg-red-500 rounded-md"
                onClick={onDeleteNote}
              >
                DELETE NOTE
              </button>
            </div>
          </form>
        </div>
      </MainContainer>
    </div>
  );
}

export default UpdateNote