import { Button, Modal } from 'antd';
import { useState } from 'react';

const Sidebar = () => {
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

 
  return (
    <div className="bg-gray-950 text-white fixed left-0 top-[66px] w-[200px] h-full">
      <ul>
        <li onClick={showModal} className="text-center cursor-pointer  p-2 border-y-2 border-green-300">Create</li>
        <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <div className='flex flex-col gap-3'>
     <label htmlFor="">Title</label>
      <input className='border-2 broder-gray-200 outline-none py-2 px-4' type="text" />

      <label htmlFor="" >Description</label>
      <textarea className='border-2 broder-gray-200 outline-none py-2 px-4' name="" id=""></textarea>

      <label htmlFor="file" className= 'bg-green-950 cursor-pointer text-white px-2 py-2 rounded-md hover:bg-green-700 w-max'>Image/Video</label>
      <input id='file' type="file" hidden/>
      <img src="" alt="" />
      
      <button className= 'bg-blue-950 cursor-pointer text-white px-2 py-2 rounded-md hover:bg-green-700 w-full'>Submit</button>
     </div>
      </Modal>
      </ul>
    </div>
  )
}

export default Sidebar
