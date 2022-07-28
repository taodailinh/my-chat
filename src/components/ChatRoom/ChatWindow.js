import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Tooltip, Button, Input, Form } from "antd";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppContext";
import Message from "./Message";
const WrapperStyled = styled.div`
  height: 100vh;
`;
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  align-item: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
    }
  }
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
const ContentStyled = styled.div`
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const MessageListStyled = styled.div`
  max-height: 100%;
  over-flow-y: auto;
`;
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px;
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;
export default function ChatWindow() {
  const { selectedRoom, members } = useContext(AppContext);

  // const selectedRoom = rooms.find((room) => room.name === selectedRoomId);
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="header__title">
            {selectedRoom ? selectedRoom.name : "Please choose a chat room"}
          </p>
          <span className="header__description">
            {selectedRoom?.description}
          </span>
        </div>
        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined />} type="text">
            Mời
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            {members.map((member) => (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>
                  {member.photoURL ? "" : member.displayName.charAt(0)}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message
            text="Vợ vợ"
            photoURL={null}
            displayName="Linh"
            creatAt={3134121221}
          ></Message>
          <Message
            text="Anh anh"
            photoURL={null}
            displayName="Cát"
            creatAt={3134121221}
          ></Message>
          <Message
            text="Chồng chồng"
            photoURL={null}
            displayName="Trâm"
            creatAt={3134121221}
          ></Message>
          <Message
            text="Em em"
            photoURL={null}
            displayName="Lượng"
            creatAt={3134121221}
          ></Message>
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input
              placeholder="Nhập tin nhắn..."
              bordered={false}
              autoComplete="off"
            />
          </Form.Item>
          <Button type="primary">Gửi</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
}
