import React, { useContext } from "react";
import { Collapse, Typography, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppContext";
const { Panel } = Collapse;
const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
    .ant-collapse-content {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

export default function RoomList() {
  const { rooms, setAddRoomVisible, setSelectedRoomId } =
    useContext(AppContext);
  const handleAddRoom = () => {
    setAddRoomVisible(true);
  };
  return (
    <div>
      <Collapse defaultActiveKey={["1"]} ghost>
        <PanelStyled header="Danh sách các phòng" key="1">
          {rooms.map((room) => (
            <LinkStyled
              key={room.name}
              onClick={() => setSelectedRoomId(room.name)}
            >
              {room.name}
            </LinkStyled>
          ))}
          <Button
            type="text"
            icon={<PlusSquareOutlined />}
            className="add-room"
            onClick={handleAddRoom}
          >
            Thêm phòng
          </Button>
        </PanelStyled>
      </Collapse>
    </div>
  );
}
