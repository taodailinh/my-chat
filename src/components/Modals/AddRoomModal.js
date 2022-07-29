import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
export default function AddRoomModal() {
  const { isAddRoomVisible, setAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const [form] = Form.useForm();
  const handleOk = () => {
    // Tạo document trong firestore
    console.log("Formdata", { formData: form.getFieldsValue() });
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });
    // Update state
    setAddRoomVisible(false);
    // Reset modal
    form.resetFields();
  };
  const handleCancel = () => {
    // Update state
    setAddRoomVisible(false);
    // Reset modal
    form.resetFields();
  };
  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
