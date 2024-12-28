import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { GoComment } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { Button, Modal } from "flowbite-react";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";


const Home = () => {
  
let ctx = useContext(UserContext);
let user = ctx.userInfo.user;    
let token = ctx.userInfo.token;


  const [posts, setPosts] = useState([]);
  async function getAllPosts() {
    let res = await axios.get(`http://localhost:8990/api/posts/getAllPost`);
    let data = res.data;
    // console.log(data.posts);
    setPosts(data.posts);
  }
  useEffect(() => {
    getAllPosts();
  },[]);

  const [openModal, setOpenModal] = useState(false);

  const [selectedPost, setselectedPost] = useState("");

  const handleComment = (ele) =>{
    console.log(ele);
    setselectedPost(ele);
    setOpenModal(true); 
  }

  const [newComment, setnewComment] = useState("");
  const handleCommentChanger = (e) =>{
    console.log(e.target.value)
    setnewComment(e.target.value);
  }

  const handleCommentSubmit = async(ele) =>{
    console.log(ele._id);
    let obj = {
      text:newComment
    }

    let res = await axios.post(`http://localhost:8990/api/posts/comment/${ele._id}`,obj,{
      headers:{
        'Authorization':token
      }
    })
    let data = res.data;
    console.log(data);
    if(data.success){
      toast.success(data.msg,{position:'bottom-right'});
      setnewComment("")
      getAllPosts()
    }
  } 


  return (
    <div>
      <Sidebar getAllPosts={getAllPosts} />
      <div className="ml-[210px] border-gray-500 flex flex-col items-center gap-5">
        {posts.map((ele, index) => {
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
                <CiHeart  className="cursor-pointer" size={30}/>
                {/* <FaHeart color="red" fill="red" size={24}/> */}
                <GoComment className="cursor-pointer" onClick={()=>handleComment(ele)}  size={26}/> 
                <PiShareFatLight className="cursor-pointer" size={30}/>
             
              </div> 
            
              </div>
              <div className="py-1 px-5 gap-2 flex items-center">
                <img src={user?.profilePic} className="w-12 h-12 rounded-full border-2" alt="" />
                <input value={newComment} onChange={handleCommentChanger} className="w-full border-2 outline-none focus:none h-8 rounded-md"
                placeholder="write your comment.." type="text" />
                <IoMdSend className="cursor-pointer" onClick={()=>handleCommentSubmit(ele)} size={26}/>
              </div>
            </div>
          ); 
        })}


      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Comments...</Modal.Header>
        <Modal.Body>
         {
          selectedPost?.comments?.length>0? <div className="space-y-6">
          {
           selectedPost?.comments?.map((item,i) =>{
             return <div key={i} className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
              <img src={item.user.profilePic} className="h-7 w-7 rounded-full border-2" alt="" />
              <p className="capitalize text-xs">{item.user.name}</p>
              </div>
               <p>{item.text}</p>
             </div>
           })
          }
           </div>
           : <h1 className="capitialize text-center text-xl">No Comments Available</h1>
         }
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Ok
          </Button>
        </Modal.Footer> 
      </Modal>
      </div>
    </div>
  );
};

export default Home;
