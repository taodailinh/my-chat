import React, { useState, useMemo } from "react";
import { auth } from "../firebase/config";
import { Spin } from "antd";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  const [isAddRoomVisible, setAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  console.log(uid);
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);
  const rooms = useFirestore("rooms", roomsCondition);
  const selectedRoom = useMemo(
    () => rooms.find((room) => room.name === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = useMemo(() => {
    if (!selectedRoom.members) {
      return { fieldName: "uid", operator: "==", compareValue: "" };
    }
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);
  const members = useFirestore("users", usersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        selectedRoom,
        members,
        isAddRoomVisible,
        setAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
