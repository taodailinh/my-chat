import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Tooltip, Button, Input, Form } from "antd";
import React from "react";
import styled from "styled-components";
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
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="header__title">Room 1</p>
          <span className="header__description">Day la room 1</span>
        </div>
        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined />} type="text">
            Mời
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="B">
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title="C">
              <Avatar>C</Avatar>
            </Tooltip>
            <Tooltip title="D">
              <Avatar>D</Avatar>
            </Tooltip>
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
