import { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  let navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  // console.log(userDetails);

  const handleInputChanger = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    // console.log(value);
    // console.log(name);
    setuserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);

    let res = await fetch("http://localhost:8990/api/users/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    let data = await res.json();
    console.log(data);
    if (data.success) {
      toast.success(data.msg, { position: "top-center" });
      navigate("/login");
    } else {
      toast.error(data.msg, { position: "top-center" });
    }
  };

  return (
    <div className="signupPage">
      <div className="flex justify-center h-[675px] mt-19">
      <div
        className="hidden bg-cover lg:block lg:w-2/3"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
        }}
      >
        <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Connectify</h2>
            <p className="max-w-xl mt-3 text-gray-300">
             Connectify –  gateway to meaningful connections. Share moments, build relationships, and stay connected effortlessly. 🌟🌐&quot;
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div className="flex-1">
          <div className="text-center">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
            </div>
            <p className="mt-3 font-bold text-lg text-blue-500 dark:text-gray-300">Create Your Account</p>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  onChange={handleInputChanger}
                  placeholder="Enter your Full Name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>
              {/* Email Input */}
              <div className="mt-6">
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handleInputChanger}
                  placeholder="example@example.com"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  {/* <Link to="/forgetpassword" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">
                    Forgot password?
                  </Link> */}
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChanger}
                  id="password"
                  placeholder="Your Password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              {/* Sign in Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-sm text-center text-gray-400">
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                Sign In
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
