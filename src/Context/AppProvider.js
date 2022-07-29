import React, { useState } from "react";

export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  const [isAddRoomVisible, setAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setInviteMemberVisible] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isAddRoomVisible,
        setAddRoomVisible,
        isInviteMemberVisible,
        setInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
