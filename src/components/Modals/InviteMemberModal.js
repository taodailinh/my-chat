import React, { useContext, useState } from "react";
import { Avatar, Form, Modal, Select, Spin } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { ChatContext } from "../../Context/ChatProvider";

import { debounce } from "lodash";
import { db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

async function fetchUserList(search) {
  const collectionRef = collection(db, "users");
  const q = query(
    collectionRef,
    where("keywords", "array-contains", search),
    orderBy("createdAt")
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  return querySnapshot.docs.map((doc) => ({
    label: doc.data().displayName,
    value: doc.data().uid,
    photoURL: doc.data().photoURL,
  }));
}

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);
      console.log("value", value);
      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);
  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.displayName.charAt(0).toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

export default function InviteMemberModal() {
  const { isInviteMemberVisible, setInviteMemberVisible } =
    useContext(AppContext);
  const { selectedRoomId, selectedRoom } = useContext(ChatContext);
  const [value, setValue] = useState();
  const [form] = Form.useForm();
  const handleOk = () => {
    // Update database (members in room)
    const roomRef = doc(db, "rooms", selectedRoomId);
    updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    // Update state
    setInviteMemberVisible(false);
    // Reset modal
    form.resetFields();
  };
  const handleCancel = () => {
    // Update state
    setInviteMemberVisible(false);
    // Reset modal
    form.resetFields();
  };
  return (
    <div>
      <Modal
        title="Thêm thành viên"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            label="Tên các thành viên"
            value={value}
            mode="multiple"
            placeholder="Nhập tên các thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
          />
        </Form>
      </Modal>
    </div>
  );
}
