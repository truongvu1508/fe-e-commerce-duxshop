import type { FormProps } from "antd";
import {
  App,
  Button,
  Form,
  Input,
  Card,
  Typography,
  Row,
  Checkbox,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  ShoppingCartOutlined,
  TrophyOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { loginApi } from "../services/api";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/app.provider";

const { Title, Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const LoginPage = () => {
  const { notification } = App.useApp();
  const { setUsername } = useAppContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;
    try {
      const res = await loginApi(username!, password!);

      if (res?.data?.data) {
        const access_token = res.data.data.access_token;
        localStorage.setItem("access_token", access_token);
        setUsername(username!);
        notification.success({
          message: "Đăng nhập thành công!",
          description: `Chào mừng ${username} đến với DuxShop`,
          placement: "topRight",
        });
        navigate("/");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ?? "Có lỗi không xác định xảy ra";
      notification.error({
        message: "Đăng nhập thất bại",
        description: message,
        placement: "topRight",
      });
      console.log(error.response?.data);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const features = [
    {
      icon: <TrophyOutlined style={{ fontSize: 28, color: "#1890ff" }} />,
      title: "Thương hiệu uy tín",
      description: "Hơn 50,000+ khách hàng tin tưởng",
    },
    {
      icon: <SafetyOutlined style={{ fontSize: 28, color: "#1890ff" }} />,
      title: "Bảo hành chính hãng",
      description: "Cam kết 100% sản phẩm chính hãng",
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: 28, color: "#1890ff" }} />,
      title: "Giao hàng nhanh",
      description: "Miễn phí ship toàn quốc trong 24h",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #001529 0%, #002140 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "60%",
          height: "120%",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          transform: "rotate(-15deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: "40%",
          height: "80%",
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "50%",
        }}
      />

      <Card
        style={{
          width: "100%",
          maxWidth: 620,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "24px",
          boxShadow: "0 20px 40px rgba(0, 21, 41, 0.3)",
          position: "relative",
          zIndex: 1,
        }}
        bodyStyle={{ padding: "48px 40px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title
            level={2}
            style={{ color: "#001529", marginBottom: 8, fontSize: 28 }}
          >
            Đăng nhập
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Chào mừng bạn quay trở lại DuxShop
          </Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <Form.Item<FieldType>
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự!" },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Nhập tên đăng nhập"
              style={{
                borderRadius: "12px",
                height: 48,
                fontSize: 16,
                border: "1px solid #e5e7eb",
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
            style={{ marginBottom: 16 }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Nhập mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{
                borderRadius: "12px",
                height: 48,
                fontSize: 16,
                border: "1px solid #e5e7eb",
              }}
            />
          </Form.Item>

          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 32 }}
          >
            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox style={{ fontSize: 14 }}>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <Button
              type="link"
              style={{
                padding: 0,
                fontSize: 14,
                height: "auto",
                color: "#1890ff",
              }}
            >
              Quên mật khẩu?
            </Button>
          </Row>

          <Form.Item style={{ marginBottom: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                height: 52,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #001529 0%, #002140 100%)",
                border: "none",
                fontSize: 16,
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0, 21, 41, 0.4)",
              }}
            >
              <ShoppingCartOutlined style={{ marginRight: 8 }} />
              Đăng nhập
            </Button>
          </Form.Item>

          <div
            style={{
              textAlign: "center",
              padding: "24px 0 0",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <Text type="secondary" style={{ marginRight: 8, fontSize: 15 }}>
              Chưa có tài khoản?
            </Text>
            <Button
              type="link"
              style={{
                padding: 0,
                fontWeight: 600,
                fontSize: 15,
                height: "auto",
                color: "#1890ff",
              }}
              onClick={() => navigate("/register")}
            >
              Đăng ký ngay
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
