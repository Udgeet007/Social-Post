import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

const Profile = () => {
  let ctx = useContext(UserContext);
  console.log(ctx.userInfo.token);

  const [userInfo, setUserInfo] = useState("");
  console.log(userInfo);
  async function getUserData() {
    let res = await axios.get("http://localhost:8990/api/users/getUser", {
      headers: {
        Authorization: ctx.userInfo.token,
      },
    });
    let data = res.data;
    console.log(data);
    setUserInfo(data.data);
  }

  const [allPosts, setAllPosts] = useState([]);

  async function yourPosts() {
    let res = await axios.get(`http://localhost:8990/api/posts/getYourPost`, {
      headers: {
        Authorization: ctx.userInfo.token,
      },
    });
    let data = res.data;
    console.log(data.post);
    setAllPosts(data.post);
  }

  useEffect(() => {
    yourPosts();
  }, []);
  

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="w-[80%] mx-auto bg-blue-400">
      <div className="coverPicBox h-[25vw] relative">
        <img className="h-full w-full" src={userInfo?.coverPic} alt="" />
        <div className="profilePicBox w-48 h-48 rounded-full absolute left-[50%] translate-x-[-50%] -bottom-24">
          <img
            src={userInfo?.profilePic}
            className="w-full h-full rounded-full"
            alt=""
          />
        </div>
      </div>

      <div>
        <h1 className="profileName capitalize  mt-[100px] text-center font-bold text-2xl">
          {userInfo?.name}
        </h1>
      </div>
    </div>
  );
};

export default Profile;
