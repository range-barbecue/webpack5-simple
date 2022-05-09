import React from "react";
import { Button } from "antd";

function Login(props) {
  const login = () => {
    document.cookie = "MYTOKEN=l7upllv5kgb1nm5q3fuqlamk58";
    props.history.push("/home");
  };

  return (
    <div>
      <Button type="primary" onClick={login}>
        点击登录系统
      </Button>
    </div>
  );
}

export default Login
