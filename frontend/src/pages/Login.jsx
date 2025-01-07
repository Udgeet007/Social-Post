import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import UserContext from "../context/UserContext";

const Login = () => {
  let userCtx = useContext(UserContext);
  let navigate = useNavigate();

  let emailRef = useRef();
  let passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      let res = await axios.post("http://localhost:8990/api/users/login", obj);
      console.log(res.data);

      if (res.data.success) {
        // Update context with user data
        userCtx.AddUser(res.data);

        // Navigate to the home page after successful login
        navigate("/");

        // Show success toast
        toast.success(res.data.msg, { position: "top-center", theme: "dark" });
      } else {
        // Show error toast if login fails
        toast.error(res.data.msg, { position: "top-center", theme: "colored" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred, please try again later.", { position: "top-center", theme: "colored" });
    }
  };

  return (
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
            Welcome to Connectify – where connections come to life! Share, connect, and grow with your community. 🚀✨
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
            <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  id="email"
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
                  <Link to="/forgetpassword" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  ref={passwordRef}
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
                  Sign in
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-sm text-center text-gray-400">
              Don&apos;t have an account yet?{" "}
              <Link to="/register" className="text-blue-500 focus:outline-none focus:underline hover:underline">
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
