import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const Navbar = () => {
  let userCtx = useContext(UserContext);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div>
      <nav className="bg-gradient-to-r fixed top-0 left-0 right-0 from-blue-500 via-indigo-500 to-purple-500 shadow-md z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between  items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">SocialApp</div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-grow mx-4">
            <input
              type="text"
              placeholder="Search for users..."
              className="w-[500px] px-4 py-2 mx-auto border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <img onClick={()=>setShowDropdown(!showDropdown)} className="w-10 h-10 rounded-full" src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" alt="" />

            { showDropdown === true && 
              <div className="dropDownBox absolute top-[120%] right-0  bg-gray-400 p-5">
                <ul>
                  <li  className="border-2 py-2 px-5 border-gary-700"><button>Profile</button></li>
                  <li className="border-2 py-2 px-5 border-b-gary-700">
                    <button className="bg-green-950 px-3 py-2 text-white rounded-md">Login</button>
                  </li>
                  <li className="border-2 py-2 px-5 border-b-gary-700">
                    <button className="bg-blue-950 px-3 py-2 text-white rounded-md">Signup</button>
                  </li>
                  <li onClick={() => userCtx.logout()} className="border-2 py-2 px-5 border-b-gary-700">
                    
                    <button className="bg-green-950 px-3 py-2 text-white rounded-md">Logout</button>
                  </li>
                </ul>
              </div>}
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
