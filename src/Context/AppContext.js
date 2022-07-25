import React from "react";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}
