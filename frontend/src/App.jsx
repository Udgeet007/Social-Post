import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import ForgetPassword from "./pages/ForgetPassword";
import Profile from "./pages/Profile";
import FriendProfile from "./pages/FriendProfile";
import Chat from "./pages/Chat";



function App() {
  // let login = true;
  let userCtx = useContext(UserContext);
  console.log(userCtx);
  let login = userCtx.userInfo.login;
  console.log(login);

  return (
    <>
      <BrowserRouter>
        <div className="mt-[65px] mb-[10px]">
          <Navbar />
        </div>
        <Routes>
          <Route
            path="/"
            element={login === true ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/register"
            element={login === false ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={login === false ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friendProfile" element={<FriendProfile />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <ToastContainer />
        
      </BrowserRouter>
    </>
  );
}

export default App;
