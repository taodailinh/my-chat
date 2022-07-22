import React from "react";
import ChatWindow from "./ChatWindow";
import SideBar from "./SideBar";
import { Col, Row } from "antd";

export default function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={8}>
          <SideBar />
        </Col>
        <Col span={16}>
          <ChatWindow />
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
