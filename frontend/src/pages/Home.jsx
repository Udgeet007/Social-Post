import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

const Home = () => {
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

  return (
    <div>
      <Sidebar getAllPosts={getAllPosts} />
      <div className="ml-[210px] border-gray-500 flex flex-col items-center gap-5">
        {posts.map((ele, index) => {
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
  );
};

export default Home;
