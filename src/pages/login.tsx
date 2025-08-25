import type { FormProps } from "antd";
import { App, Button, Form, Input } from "antd";
import axios from "axios";
import { loginApi } from "../services/api";
import { useNavigate } from "react-router";

type FieldType = {
  username?: string;
  password?: string;
};

const LoginPage = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;
    try {
      const res = await loginApi(username!, password!);

      if (res?.data?.data) {
        const access_token = res.data.data.access_token;
        localStorage.setItem("access_token", access_token);
        navigate("/");
      }
    } catch (error: any) {
      const message = error.response.data.message ?? "unknown";
      notification.error({ message: "Có lỗi xảy ra", description: message });
      console.log(error.response.data);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ width: 600, margin: "auto", padding: 50 }}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
