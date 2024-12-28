/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const FriendProfile = () => {

  let ctx = useContext(UserContext);
  console.log(ctx)

  let userId = ctx.userInfo.userId;
  let location = useLocation();
  console.log(location);

  const [friend, setfriend] = useState("");
  const [friendPost, setfriendPost] = useState([]);
  console.log(friend);
  console.log(friendPost);   
  async function getFriendUser(){
    let res = await axios.get(`http://localhost:8990/api/users/getuser/${location.state}`)
    let data = res.data;
    if(data.success){
      setfriend(data.friend);
    }
  }

  async function getFriendPosts(){
    let res = await axios.get(`http://localhost:8990/api/posts/getfriendPost/${location.state}`)
    let data = res.data;
    if(data.success){
      setfriendPost(data.posts);
    }
  }

  useEffect(() =>{
    getFriendUser()
  },[location.state]);

  useEffect(() =>{
    getFriendPosts()
  },[location.state]);

  const handleFollow = async() =>{
    let res = await axios.post(`http://localhost:8990/api/users/followUser/${friend._id}`,{},{
      headers:{
        'Authorization':ctx.userInfo.token
      }
    })
    let data = res.data;
    console.log(data);
     getFriendUser();
  }

  return (
    <div className="w-[80%] mx-auto">
    <div className="bg-gradient-to-r from-blue-200 to-cyan-200">
    <div className="coverPicBox h-[20vw] relative">
        <img className="h-full w-full" src={friend?.coverPic} alt="" />
        <div className="profilePicBox w-40 h-40 rounded-full absolute left-[50%] translate-x-[-50%] -bottom-20">
          <img
            src={friend?.profilePic}
            className="w-full h-full rounded-full"
            alt=""
          />
        </div>
      </div> 

      <div>
        <h1 className="profileName capitalize  mt-[80px] text-center font-bold text-2xl">
          {friend?.name}
        </h1>
        <h1 className="profileName capitalize text-center font-bold text-2xl">
          {friend?.bio}
        </h1>
      

        <div className="flex justify-center gap-10">
          <div className="flex flex-col items-center font-bold"><p>Followers</p> <span>{friend?.followers?.length}</span></div>
          <div  className="flex flex-col items-center font-bold"><p>Followings</p> <span>{friend?.followings?.length}</span></div>
        </div>
      </div>
      <div className="flex justify-center">
     {friend?.followers?.includes(userId) ?  <button onClick={handleFollow} className="bg-orange-400 px-4 py-2 hover:bg-blue-600 rounded-md text-white" >Unfollow</button>
     :
        <button onClick={handleFollow} className="bg-orange-400 px-4 py-2 hover:bg-blue-600 rounded-md text-white" >Follow</button>}  
        </div>
    </div>
    </div>
  );
  };

export default FriendProfile;
