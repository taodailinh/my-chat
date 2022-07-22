import React from "react";
import { Collapse, Typography, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import styled from "styled-components";
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
  return (
    <div>
      <Collapse defaultActiveKey={["1"]} ghost>
        <PanelStyled header="Danh sách các phòng" key="1">
          <LinkStyled>Room 1</LinkStyled>
          <LinkStyled>Room 2</LinkStyled>
          <LinkStyled>Room 3</LinkStyled>
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
