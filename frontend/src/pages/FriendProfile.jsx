/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
// import { Button, Modal } from "flowbite-react";
import { IoMdSend } from "react-icons/io";
import { formatDistanceToNow} from "date-fns";
// import { MdDeleteOutline } from "react-icons/md";
import { GoComment } from "react-icons/go";



const FriendProfile = () => {

  let ctx = useContext(UserContext);
  console.log(ctx)

  let userId = ctx.userInfo.userId;
  let user = ctx.userInfo.user;

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
    <div className="flex flex-col items-center gap-4 mt-7">
      {
        friendPost.map((ele,index) =>{
                     return (
                       <div
                         key={index}
                         className="w-[540px] px-2 py-1 relative overflow-hidden border-2 shadow-md bg-white rounded-lg  dark:bg-gray-800"
                       >
                        
                            <div className="mt-2 ms-4">
                             <div className="flex items-center">
                               <div className="flex items-center">
                                 <img
                                   className="object-cover h-10 rounded-full"
                                   src={friend.profilePic}
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
                               <p>
                                 {/* time ago section */}
                                 {formatDistanceToNow(new Date(ele.createdAt), { addSuffix: true })}
                               </p>
                               </span>
                             </div>
                           </div>
                         {ele.file.includes("image") ? (
                           <img     
                             className="object-cover p-1 w-full h-64"
                             src={ele.file}
                             alt="Article"
                           />
                         ) : ele.file.includes('video')?(
                           <video controls src={ele.file} className=""></video>
                         ):''}
           
                         <div className="px-2">
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
           
                           <div className="flex gap-2 ms-4 items-center">
                             {
                               ele.likes.includes(user._id) ?
                               <FaHeart color="red" fill="red" size={24}/>  :
                           <CiHeart className="cursor-pointer" size={30}/>
                             }
                             <sup>{ele.likes.length}</sup>
                           <GoComment className="cursor-pointer"   size={26}/> 
                             <sup className="bg-blue-500 rounded-full w-5 h-5 flex justify-center items-center">{ele.comments.length}</sup>
                           <PiShareFatLight className="cursor-pointer" size={30}/>  
                         </div> 
                       
                         </div>
                         <div className="py-1 px-5 gap-2 flex items-center">
                           <img src={user?.profilePic} className="w-12 h-12 rounded-full border-2" alt="" />
                           <input className="w-full border-2 outline-none focus:none h-8 rounded-md"
                           placeholder="write your comment.." type="text" />
                           <IoMdSend className="cursor-pointer" size={26}/>
                         </div>
                       </div>
                     ); 
                   })}
           
           
                 {/* <Modal show={openModal} onClose={() => setOpenModal(false)}>
                   <Modal.Header>Comments...</Modal.Header>
                   <Modal.Body>
                    {
                     selectedPost?.comments?.length>0? <div className="space-y-6">
                     {
                      selectedPost?.comments?.map((item,i) =>{
                        return <div key={i} className="border relative rounded-md p-3 ml-3 my-3">
                         <div className="flex gap-3 items-center">
                         <img src={item.user.profilePic} className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400 shadow-emerald-400" alt="" />
                         <h3 className="font-bold">{item.user.name}</h3>
                         </div>
                          <p className="text-gray-600 mt-2">{item.text}</p>
           
                         {user._id===item.user._id && <MdDeleteOutline onClick={()=>handleCommentDelete(item, selectedPost)} className="absolute top-2 text-lg cursor-pointer right-5"/>}
                        </div>
                      })
                     }
                      </div> 
                      : <h1 className="capitialize text-center text-xl">No Comments Available</h1>
                    }
                   </Modal.Body>
                   {/* <Modal.Footer>
                     <Button color="gray" onClick={() => setOpenModal(false)}>
                       Ok
                     </Button>
                   </Modal.Footer>  */}
                 {/* </Modal> */} 
              
        
    </div>
    </div>
  );
  };

export default FriendProfile;
