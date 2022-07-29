import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { auth } from "../../firebase/config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDocument, generateKeywords } from "../../firebase/services";
const { Title } = Typography;

const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const navigate = useNavigate();
  const handleFbLogin = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        const _tokenResponse = result._tokenResponse;
        console.log("result", result);
        console.log(_tokenResponse);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(_tokenResponse?.isNewUser);
        if (user) {
          if (_tokenResponse?.isNewUser) {
            console.log("Adding to firestore");
            addDocument("users", {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
              providerId: result.providerId,
              keywords: generateKeywords(user.displayName),
            });
          }
          navigate("/");
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }}>Fun Chat</Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button style={{ width: "100%" }} onClick={handleFbLogin}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
