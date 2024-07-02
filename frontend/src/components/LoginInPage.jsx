import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import Loader from "./Loader";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, setLoading } from "../utils/userSlice";

const LoginInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, loading } = useSelector((store) => store.user);

  //   setting user info
  const setUser = async (user) => {
    dispatch(addUser(user));
  };

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
    closeSnackbar();
    try {
      const userDetails = { email, password };
      dispatch(setLoading(true));
      const data = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const json = await data.json();
      if (json?.data) {
        localStorage.setItem("userInfo", JSON.stringify(json?.data)); //saving user info in local storage
        await setUser(json?.data); //set Data to store

        navigate("/mynotez");
        // await fetchNotes(json?.data?.token);
      }
      showMessage(json?.result, json?.status);
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
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
      <MainContainer title={"Login"}>
        {loading && <Loader />}

        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col p-2">
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
          </div>
          <button className="w-24 bg-blue-500 py-1 m-2 rounded-md mt-4 text-white shadow-lg hover:bg-blue-700">
            Login
          </button>
          <h2 className="m-2">
            New registered yet ?
            <Link to={"/register"} className="px-2 py-1 font-bold">
              Sign Up
            </Link>
          </h2>
        </form>
      </MainContainer>
    </div>
  );
};

export default LoginInPage;
