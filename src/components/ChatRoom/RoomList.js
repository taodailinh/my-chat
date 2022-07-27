import React from "react";
import { Collapse, Typography, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import styled from "styled-components";
import useFirestore from "../../hooks/useFirestore";
import { AuthContext } from "../../Context/AuthProvider";
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
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  console.log(uid);
  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, []);

  const rooms = useFirestore("rooms", roomsCondition);
  console.log("rooms", rooms);
  return (
    <div>
      <Collapse defaultActiveKey={["1"]} ghost>
        <PanelStyled header="Danh sách các phòng" key="1">
          {rooms.map((room) => (
            <LinkStyled key={room.id}>{room.name}</LinkStyled>
          ))}
          <Button
            type="text"
            icon={<PlusSquareOutlined />}
            className="add-room"
          >
            Thêm phòng
          </Button>
        </PanelStyled>
      </Collapse>
    </div>
  );
}
