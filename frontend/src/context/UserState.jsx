/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const UserState = (props) => {
  let userDetails = JSON.parse(localStorage.getItem("socialPost"));
  const [userInfo, setUserInfo] = useState({
    login: userDetails ? userDetails.login : false,
    token: userDetails ? userDetails.token : "",
    userId: userDetails ? userDetails.userId : "",
    user: "",
  });

  console.log(userInfo);

  const getUserDetails = async () => {
    let res = await axios.get(`http://localhost:8990/api/users/getUser`, {
      headers: {
        Authorization: userInfo.token,
      },
    });
    let data = res.data;
    // console.log(data.data.name);

    if (data.success) {
      setUserInfo({...userInfo, user:data.data});
      console.log(data.data);
    }else{
      console.log("error in get user details");
    }
  };

  useEffect(() => {
    if (userInfo.token) {
      getUserDetails();
    }
  }, [userInfo.token]);

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
    <UserContext.Provider value={{ userInfo, AddUser, logout, getUserDetails }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
