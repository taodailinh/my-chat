import { Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // Không hiểu sao cái use effect này chạy tới 2 lần rồi nếu không có else thì lại nhảy ra trang login

  React.useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log("Test");
      // debugger;
      console.log(user);
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoading(false);
        navigate("/login");
      }
    });
    // clean function
    return () => {
      unsubscribed();
    };
  }, [navigate]);
  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
