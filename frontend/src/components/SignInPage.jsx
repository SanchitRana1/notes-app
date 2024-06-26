import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading } from "../utils/userSlice";
import useCheckUserInfo from "../hooks/useCheckUserInfo";

const SignInPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, loading } = useSelector((store) => store.user);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showMessage("Passwords Do Not Match !", "error");
    } else {
      try {
        const userDetails = { name, email, password, picMessage };
        dispatch(setLoading(true));
        const data = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });
        const json = await data.json();
        if (json?.data) {
          localStorage.setItem("userInfo", JSON.stringify(json?.data)); //saving user info in local storage
          navigate("/mynotez");
        }
        showMessage(json?.result, json?.status);
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
      }
    }
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
        "https://api.cloudinary.com/v1_1/da9vcx3og/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const json = await resp.json();
      console.log(json);
      setPicMessage(json?.url);
    } else {
      showMessage("Please Select an Image", "error");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotez");
    }
  }, []);

  return (
    <div className="">
      {/* <MainContainer title={title} /> */}
      <MainContainer title={"Register"}>
        {loading && <Loader />}

        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
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
            />
            <h1 className="pt-4">Confirm Password</h1>
            <input
              type="password"
              className="border-2 border-gray-400 outline-none px-2 rounded-md"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <h1 className="pt-4">Profile Picture</h1>
            <div className="flex">
              <input
                type="file"
                className=" border-gray-400 outline-none px-2 rounded-md"
                onChange={(e) => {
                  postDetails(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <button className="w-24 bg-blue-500 py-1 m-2 rounded-md mt-4 text-white shadow-lg hover:bg-blue-700">
            Register
          </button>
          <h2 className="m-2 ">
            Already a User ?
            <Link to={"/login"} className="px-2 py-1 font-bold">
              {" "}
              Login
            </Link>
          </h2>
        </form>
      </MainContainer>
    </div>
  );
};

export default SignInPage;
