import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import axios from 'axios';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  let userCtx = useContext(UserContext);
  let id = userCtx.userInfo.userId;
  console.log(userCtx);
  let login = userCtx.userInfo.login;

  let navigate = useNavigate();
  const [friendsUsers, setfriendsUsers]= useState([]);
  console.log(friendsUsers);
  const handleInputChanger=async(e) =>{
   let res = await axios.get(`http://localhost:8990/api/users/username?q=${e.target.value}`);
   let data = res.data;
    setfriendsUsers(data);
  }
 
  return (
    <div>
      <nav className="bg-gradient-to-r fixed top-0 left-0 right-0 from-blue-500 via-indigo-500 to-purple-500 shadow-md z-50">
        <div className="container mx-auto  px-4 py-3 flex justify-between  items-center">
          {/* Logo */}
          <Link to={"/"} className="text-2xl font-bold text-white">
            SocialPost
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex w-1/3 items-center relative">
            <input
              type="text"
              onChange={handleInputChanger}
              placeholder="Search for users..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ul className="bg-orange-200 rounded-lg w-full absolute top-full">
              { 
                friendsUsers.map((friend,i)=>{
                  //isse data bejh sakte hae state attribute ka use krke
                  return friend._id!==id && <Link state={friend._id} onClick={()=>setfriendsUsers([])} to='/friendProfile' key={i} className="cursor-pointer rounded-lg flex px-2 py-2 items-center border-b-2 gap-6">
                    <img className="w-11 h-11 rounded-full" src={friend.profilePic} alt="" />
                    <p className="capitalize">{friend.name}</p>  
                  </Link>
                })
              }
            </ul>
            <IoSearchSharp
              className="absolute right-4  top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-500"
              size={25}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* <a href="#" className="text-white hover:text-gray-200">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              About
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              Contact
            </a>
            <button onClick={() => userCtx.logout()} className="block px-4 py-2 hover:bg-gray-300">Logout</button> */}

            {/* Account Dropdown */}
            {/* <div className="relative">
              <button
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="text-white hover:text-gray-200 focus:outline-none py-2 px-4 bg-blue-700 rounded-md"
              >
                Account
              </button>
              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>

                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div> */}
            {/* Profile Picture */}
            <div className="relative ">
              <img
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full"
                src={
                  userCtx.userInfo?.user?.profilePic
                    ? userCtx.userInfo.user.profilePic
                    : "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                }
                alt=""
              />

              {showDropdown === true && (
                <div className="dropDownBox  absolute top-[120%] right-0 bg-gradient-to-r  from-blue-500 via-purple-500 to-pink-500 ">
                  <ul>
                    {login === true && (
                      <li className=" border-b-2 border-b-black py-2 px-5 ">
                        <Link to="/profile">Profile</Link>
                      </li>
                    )}
                    {login === false && (
                      <li className=" border-b-2 border-b-black  py-2 px-5 ">
                        <button className="" onClick={() => navigate("/login")}>
                          Login
                        </button>
                      </li>
                    )}
                    {login === true && (
                      <li
                        onClick={() => userCtx.logout()}
                        className=" border-b-2 border-b-black  py-2 px-5 "
                      >
                        <button className="">Logout</button>
                      </li>
                    )}
                    {login === false && (
                      <li className=" border-b-2 border-b-black  py-2 px-5 ">
                        <button
                          onClick={() => navigate("/register")}
                          className=""
                        >
                          Signup
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 py-2 space-y-2">
              <a href="#" className="block text-white hover:text-gray-200">
                Home
              </a>
              <a href="#" className="block text-white hover:text-gray-200">
                About
              </a>
              <a href="#" className="block text-white hover:text-gray-200">
                Contact
              </a>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsAccountDropdownOpen(!isAccountDropdownOpen)
                  }
                  className="block w-full text-left text-white hover:text-gray-200 focus:outline-none"
                >
                  Account
                </button>
                {isAccountDropdownOpen && (
                  <div className="mt-2 bg-white border border-gray-200 shadow-lg rounded-lg">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
