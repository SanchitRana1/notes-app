import React from "react";

const useCheckUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? true : false;
};

export default useCheckUserInfo;
