import React, { useState } from 'react'
import MainContainer from './MainContainer';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from "react-markdown"
import remarkBreaks from 'remark-breaks';
import { createNote } from '../utils/noteSlice';
import {useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
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

    const onNoteSubmit = async (e) => {
      e.preventDefault();
      const note = {title,content,category}
      const token = userInfo ? userInfo.token : "";
      const response = await fetch("http://localhost:5000/api/notes/create", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body:JSON.stringify(note)

      });
      const json = await response.json();
      const{data,result,status} = json;
      if (data) {
        dispatch(createNote(json?.data));
        navigate("/mynotez")
      }
      showMessage(result,status);
    };

    const onResetFields = (e) => {
      e.preventDefault();
      setTitle("");
      setContent("");
      setCategory("");
    };
    return (
    <div>
        <MainContainer title={"Create Note"}>
    <div className="">
     <form className = "p-2 m-2 bg-gray-10 shadow-lg w-full" action="" onSubmit={onNoteSubmit}>
        <h1 className='font-semibold text-xl font-mono'>Title</h1>
        <input className='w-full px-2 py-1 mb-2 bg-gray-100 rounded-md outline-none text-sm' type="text" placeholder='Enter the title' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        <h1 className='font-semibold text-xl font-mono'>Content</h1>
        <textarea className='w-full px-2 py-1 mb-2 bg-gray-100 rounded-md outline-none text-sm' placeholder='Enter the content' value={content} onChange={(e)=>{setContent(e.target.value)}}></textarea>
        {content && <div className="rounded-md w-full">
            <h1 className='bg-gray-200 rounded-t-md p-1 font-semibold text-xl font-mono'>Note Preview</h1>
            <div className='w-full p-2 mb-2 rounded-b-md text-sm bg-gray-100 '>
            <Markdown className="prose lg:prose-xl overflow-auto" remarkPlugins={[remarkBreaks]}>{content}</Markdown>
            </div>
        </div>
        }

        <h1 className='font-semibold text-xl font-mono'>Category</h1>
        <input className='w-full px-2 py-1 mb-2 bg-gray-100 rounded-md outline-none text-sm' type="text" placeholder='Enter the category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />

        <div className='text-white my-2 text-sm font-mono font-semibold'>
            <button className='py-1 px-2 m-1 bg-blue-500 rounded-md' type='submit'>CREATE NOTE</button>
            <button className='py-1 px-2 m-1 bg-red-500 rounded-md' onClick={onResetFields}>RESET FIELDS</button>
        </div>
     </form>
    </div>
    </MainContainer>
    </div>
  )
}

export default CreateNote