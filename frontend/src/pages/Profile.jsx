import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { CiCamera } from "react-icons/ci";
import { toast } from "react-toastify";
import { FiUserPlus } from "react-icons/fi";
import Footer from "../components/Footer";

const Profile = () => {
  let ctx = useContext(UserContext);
  console.log(ctx.userInfo.token);

  let userId = ctx.userInfo.userId;

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
  console.log(allPosts);
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

  const handleCoverChanger = async(e) =>{
    let file = e.target.files[0];
    console.log(file);

    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "social_media");
    let res = await axios.post(
      `https://api.cloudinary.com/v1_1/dq8ariioz/upload`,
      formData
    );
    let data = res.data;
    console.log(data.secure_url);

    if (data.secure_url) {
      let res1 = await axios.put(
        `http://localhost:8990/api/users/update/${userId}`,
        { coverPic: data.secure_url },
        {
          headers: {
            Authorization: ctx.userInfo.token,
          },
        }
      );
      let data1 = res1.data;
      if (data1.success) {
        getUserData();
        toast.success(data1.msg, { position: "top-center" });
      } else {
        toast.error(data1.msg, { position: "top-center" });
      }
    } else {
      toast.error("unable to upload image", { position: "top-center" });
    }

  }

  const handleProfileChanger = async (e) => {
    let file = e.target.files[0];
    console.log(file);

    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "social_media");

    let res = await axios.post(
      `https://api.cloudinary.com/v1_1/dq8ariioz/upload`,
      formData
    );
    let data = res.data;
    console.log(data.secure_url);

    if (data.secure_url) {
      let res1 = await axios.put(
        `http://localhost:8990/api/users/update/${userId}`,
        { profilePic: data.secure_url },
        {
          headers: {
            Authorization: ctx.userInfo.token,
          },
        }
      );
      let data1 = res1.data;
      if (data1.success) {
        getUserData();
        toast.success(data1.msg, { position: "top-center" });
      } else {
        toast.error(data1.msg, { position: "top-center" });
      }
    } else {
      toast.error("unable to upload image", { position: "top-center" });
    }
  };

  const handleInfoUpdater=(e) =>{
    e.preventDefault();
    setUserInfo({...userInfo,[e.target.name]:e.target.value});
  }

  const handleUpdateSubmit = async(e) =>{
    e.preventDefault();
    let res = await axios.put(
      `http://localhost:8990/api/users/update/${userId}`,
      userInfo,
      {
        headers: {
          Authorization: ctx.userInfo.token,
        },
      }
    );
    let data = res.data;
    if (data.success) {
      getUserData();
      toast.success(data.msg, { position: "top-center" });
    } else {
      toast.error(data.msg, { position: "top-center" });
    }      
  }

  return (
    <div style={{ background: 'linear-gradient(120deg, #c6ffdd 0%, #fbd786 100%)' }}>
        <div className="w-[80%] mx-auto ">
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
    <div className="coverPicBox h-[20vw] relative">
        <img className="h-full w-full bg-cover"  src={userInfo?.coverPic} alt="" />
        <input 
            type="file"
            id="profile-pic"
            onChange={handleCoverChanger}
            hidden
          />
        <label htmlFor="profile-pic" className="absolute right-1 bottom-1 ">
            <CiCamera color="red" className="cursor-pointer" size={30} />
          </label>
        <div className="profilePicBox w-40 h-40 rounded-full absolute left-[50%] translate-x-[-50%] -bottom-20">
          <img
            src={userInfo?.profilePic}
            className="w-full h-full rounded-full"
            alt=""
          />
          <input 
            type="file"
            id="profile-pic"
            onChange={handleProfileChanger}
            hidden
          />
          <label htmlFor="profile-pic" className="absolute right-0 top-7 ">
            <CiCamera color="green" className="cursor-pointer" size={30} />
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="profileName capitalize  mt-[80px] text-center font-bold text-2xl">
          {userInfo?.name}
        </h1>
        <h1 className="profileName capitalize text-center font-bold text-2xl">
          {userInfo?.bio}
        </h1>
      
        <div className="flex gap-9 ">
        <div className="flex flex-col items-center"><h3 className="font-bold">Followers</h3><p>{userInfo?.followers?.length}</p></div>
        <div className="flex flex-col items-center"><h3 className="font-bold">Following</h3><p>{userInfo?.followings?.length}</p></div>
        </div>
        <div className="flex gap-2 mb-1 cursor-pointer">
          <button className="py-1 px-2 bg-cyan-50 rounded-md ">Edit Profile</button>
          <button className="py-1 px-2 bg-cyan-50 rounded-md ">Share Profile</button>
          <FiUserPlus size={"25px"}/>
        </div>
      </div>
    </div>
      {/* Card Code Starts Here */}
      <div className="flex mt-5 ">
        {/* <div className="w-max ms-6  h-max p-4 bg-gradient-to-r from-lime-400 to-lime-500">
          <form action="">
            <label className="w-[70px] mb-4 inline-block" htmlFor="">Name:</label>
            <input className="px-3 py-2 rounded-md border-2 border-gray-400" onChange={handleInfoUpdater} name="name" value={userInfo?.name} type="text" /> <br/>
            <label className="w-[70px] mb-4 inline-block" htmlFor="">Email:</label>
            <input className="px-3 py-2 rounded-md border-2 border-gray-400" onChange={handleInfoUpdater} name="email" value={userInfo?.email} disabled type="text" /><br/>
            <label className="w-[70px] mb-4 inline-block" htmlFor="">Bio:</label>
            <textarea className="px-3 py-2 rounded-md border-2 border-gray-400" onChange={handleInfoUpdater} name="bio" value={userInfo?.bio}  id=""></textarea><br/>
            <label className="w-[70px] mb-4 inline-block" htmlFor="">Password:</label>
            <input className="px-3 py-2 rounded-md border-2 border-gray-400" onChange={handleInfoUpdater} name="password" value={userInfo?.password} type="password" /> <br />
            <button onClick={handleUpdateSubmit} className="bg-blue-600 w-full text-white rounded-md px-3 py-2 hover:bg-green-600 ">Update Info</button>
            </form>
        </div> */}
      <div className="bg-gray-400 h-min   shadow-lg rounded-lg p-8 w-[400px] space-y-6">
    <h2 className="text-2xl font-bold text-gray-800 text-center">Update Details</h2>
    <div className="space-y-4">
      <div>
        <label
          className="block text-sm font-medium text-gray-600"
          htmlFor="username"
        >
          User Name
        </label>
        <input onChange={handleInfoUpdater} name='name'
        value={userInfo?.name}
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          type="text"
          placeholder="Enter User Name"
          id="username"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-600"
          htmlFor="email"
        >
          Email
        </label>
        <input disabled
        value={userInfo?.email}
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          type="email"
          placeholder="Enter Email"
          id="email"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-600"
          htmlFor="bio"
        >
          Bio
        </label>
        <input onChange={handleInfoUpdater} name='bio'
        value={userInfo?.bio}
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          type="text"
          placeholder="Enter Bio"
          id="bio"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-600"
          htmlFor="password"
        >
          Password
        </label>
        <input onChange={handleInfoUpdater} name='password'
        value={userInfo?.password}
          className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
          type="password"
          placeholder="Enter Password"
          id="password"
        />
      </div>
    </div>
    <button onClick={handleUpdateSubmit} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition">
      Update Details
    </button>
  </div>
        <div className="ml-[40px] border-gray-500 flex flex-col items-center gap-5">
        {allPosts.map((ele, index) => {
          return ( 
            <div
              key={index}
              className="w-[500px] overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
              {ele.file.includes("image") ? (
                <img     
                  className="object-cover p-1 w-full h-64"
                  src={ele.file}
                  alt="Article"
                />
              ) : ele.file.includes('video')?(
                <video controls src={ele.file} className=""></video>
              ):''}

              <div className="p-6">
                <div> 
                  <a
                    href="#"
                    className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                    tabIndex={0}
                    role="link"
                  >
                    {ele.title}
                  </a>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {ele.description}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img
                        className="object-cover h-10 rounded-full"
                        src={ele.userId.profilePic}
                        alt="Avatar"
                      />
                      <a
                        href="#"
                        className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                        tabIndex={0}
                        role="link"
                      >
                        {ele.userId.name}
                      </a>
                    </div>
                    <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                      21 SEP 2015
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
    <div className="mt-4">
         <Footer/>
      </div>
    </div>
  
    
  );
};

export default Profile;
