/* eslint-disable react/prop-types */

import { useState } from "react";
import UserContext from "./UserContext";
import { jwtDecode } from "jwt-decode";

const UserState = (props) => {
  let userDetails = JSON.parse(localStorage.getItem("socialPost"));
  const [userInfo, setUserInfo] = useState({
    login: userDetails ? userDetails.login : false,
    token: userDetails ? userDetails.token : "",
    userId: userDetails ? userDetails.userId : "",
  });

  // console.log(userInfo);

  const AddUser = (user) => {
    console.log(user);
    const decoded = jwtDecode(user.token);
    console.log(decoded._id);
    localStorage.setItem(
      "socialPost",
      JSON.stringify({ login: true, token: user.token, userId: decoded._id })
    );
    setUserInfo({ login: true, token: user.token, userId: decoded._id });
  };

  const logout = () => {
    localStorage.removeItem("socialPost");
    setUserInfo({ login: false, token: "", userId: "" });
  };

  return (
    <UserContext.Provider value={{ userInfo, AddUser, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
