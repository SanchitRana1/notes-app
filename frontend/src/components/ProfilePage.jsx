import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import Loader from "./Loader";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../utils/userSlice";
import { CLOUD_UPLOAD_URL, USER_URL } from "../utils/constants";

const ProfilePage = () => {
  const { userInfo } = useSelector((store) => store.user);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState(userInfo?.pic);
  const [loading, setLoading] = useState(false);
  const token = userInfo ? userInfo.token : "";

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const postDetails = async (pics) => {
    if (!pics) {
      showMessage("Please Select an Image", "error");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mynotez");
      data.append("cloud_name", "da9vcx3og");
      const resp = await fetch(
        CLOUD_UPLOAD_URL,
        {
          method: "POST",
          body: data,
        }
      );
      const json = await resp.json();
      setPicMessage(json?.url);
    } else {
      showMessage("Please Select an Image", "error");
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showMessage("Passwords Do Not Match !", "error");
    } else {
      try {
        setLoading(true);
        const user = { name, email, password, pic: picMessage };
        const response = await fetch(
          USER_URL+"profile/",
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(user),
          }
        );
        const json = await response.json();
        const { data, result, status } = json;
        if (data) {
          localStorage.setItem("userInfo", JSON.stringify(data));
          dispatch(updateUser(data));
        }
        showMessage(result, status);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <div className="">
      {/* <MainContainer title={title} /> */}
      <MainContainer title={"Edit Profile"}>
        {loading && <Loader />}

        <form
          action=""
          className="flex flex-col"
          onSubmit={handleUpdateProfile}
        >
          <div className="flex flex-col p-2">
            <h1 className="pt-4">Name</h1>
            <input
              type="text"
              className="border-2 border-gray-400 outline-none px-2 rounded-md"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <h1 className="pt-4">Email address</h1>
            <input
              type="email"
              className="border-2 border-gray-400 outline-none px-2 rounded-md"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <h1 className="pt-4">Password</h1>
            <input
              type="password"
              className="border-2 border-gray-400 outline-none px-2 rounded-md"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <h1 className="pt-4">Confirm Password</h1>
            <input
              type="password"
              className="border-2 border-gray-400 outline-none px-2 rounded-md"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm Password"
            />
            <h1 className="pt-4">Profile Picture</h1>
            <div className="flex">
              <img className="w-10 rounded-full" src={picMessage} alt="" />
              <input
                type="file"
                className=" border-gray-400 outline-none px-2 rounded-md"
                onChange={(e) => {
                  postDetails(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <button className="w-24 bg-green-600 py-1 m-2 rounded-md mt-4 text-white shadow-lg hover:bg-green-700">
            Update
          </button>
        </form>
      </MainContainer>
    </div>
  );
};

export default ProfilePage;
