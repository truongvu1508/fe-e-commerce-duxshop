import { App, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import type { FormProps } from "antd";
import { createUserApi } from "../../services/api";

interface IProps {
  openCreateModal: boolean;
  setOpenCreateModal: (v: boolean) => void;
  fetchUsers: any;
}

type FieldType = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const CreateUserModal = (props: IProps) => {
  const { notification, message } = App.useApp();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { openCreateModal, setOpenCreateModal, fetchUsers } = props;

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const { fullName, email, password, confirmPassword } = values;
    setLoading(true);
    try {
      const res = await createUserApi(
        fullName,
        email,
        password,
        confirmPassword
      );

      if (res?.data?.data) {
        message.success("Tạo mới người dùng thành công");
        setOpenCreateModal(false);
        await fetchUsers();
        form.resetFields();
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.errors;

      notification.error({
        message: "Có lỗi xảy ra",
        description: errorMessage,
      });
    }
    setLoading(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Tạo mới người dùng"
      maskClosable={false}
      open={openCreateModal}
      onOk={() => form.submit()}
      onCancel={() => {
        setOpenCreateModal(false);
      }}
      okText={"Lưu"}
      okButtonProps={{ loading: loading }}
    >
      <Form
        name="create-user"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="FullName"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không đúng định dạng!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
