/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

const Sidebar = (props) => {
  let ctx = useContext(UserContext);
  console.log(ctx);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [details, setDetails] = useState({
    title: "",
    description: "",
    file: "",
  });

  console.log(details);

 

  const handleInputChanger = (e) => {
    // console.log(e.target);
    // console.log(e.target.name);
    // console.log(e.target.value);
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const [loading,setLoading] = useState(false);
  const handleFileChanger = async(e) =>{
    setLoading(true);
    let file = e.target.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset','social_media');

    let res = await axios.post(`https://api.cloudinary.com/v1_1/dq8ariioz/upload`,formData);
    let data = res.data;
    if(data.secure_url){
      setLoading(false);
    }
    console.log(data.secure_url);
    setDetails({...details, file:data.secure_url});   

  }
  // const handleFileChanger = (e) => { // file reader Method
  //   let file = e.target.files[0];

  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = () => {
  //     setDetails({ ...details, file: reader.result });
  //   };

  //   reader.onerror = () => {
  //     console.log(reader.result);
  //   };
  // };

  const handleSubmit = async () => {
    let res = await axios.post(
      `http://localhost:8990/api/posts/create`,
      details,
      {
        headers: {
          "Authorization": ctx.userInfo.token,
        },
      }
    );

    let data = res.data;
    console.log(data);
    if (data.success) {
      toast.success(data.msg, { position: "bottom-right" });
      setIsModalOpen(false);
      setDetails({
        title: "",
        description: "",
        file: "",
      });
      props.getAllPosts();
    } else {
      toast.error(data.msg, { position: "bottom-right" });
    }
  };

  return (
    <div className="bg-blue-400 font-normal text-white fixed left-0 top-[66px] w-[200px] h-full">
      <ul>
        <li
          onClick={showModal}
          className="text-center cursor-pointer  p-2 border-y-2 border-green-300"
        >
          Create
        </li>
        <Modal
          title=""
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="">Title</label>
            <input
              name="title"
              onChange={handleInputChanger}
              value={details.title}
              className="border-2 broder-gray-200 outline-none py-2 px-4"
              type="text"
            />

            <label htmlFor="">Description</label>
            <textarea
              onChange={handleInputChanger}
              className="border-2 broder-gray-200 outline-none py-2 px-4"
              name="description"
              value={details.description}
              id=""
            ></textarea>

            <label
              htmlFor="file"
              className="bg-green-950 cursor-pointer text-white px-2 py-2 rounded-md hover:bg-green-700 w-max"
            >
              Image/Video
            </label>
            <input id="file" type="file" onChange={handleFileChanger} hidden />

           <div>
           {
           loading===true ? "Loading...": <div>
            {details?.file && (
              <div>
                {details.file.includes("image") ? (
                  <img className="w-1/2 mx-auto" src={details.file} alt="" />
                ) : (
                  <video
                    className="w-1/2 mx-auto"
                    controls
                    src={details.file}
                  ></video>
                )}
              </div>
            )}
           </div>
           }
           </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-950 cursor-pointer text-white px-2 py-2 rounded-md hover:bg-green-700 w-full"
            >
              Submit
            </button>
          </div>
        </Modal>
      </ul>
    </div>
  );
};

export default Sidebar;
