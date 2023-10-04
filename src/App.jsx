import { useState, useEffect } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./store/authSlice";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(logIn(userData));
        } else {
          dispatch(logOut());
        }
      })
      .finally(setLoading(false));
  }, []);
  return !loading ? (
    <div className="flex flex-wrap min-h-screen bg-gray-400 content-between ">
      <div className="w-full block">
        <Header />
        <main>{/* <Outlet/> */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
