import { App, Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { updateUserApi } from "../../services/api";

interface IProps {
  openUpdateModal: boolean;
  setOpenUpdateModal: (v: boolean) => void;
  fetchUsers: any;
  dataUpdate: any;
  setDataUpdate: any;
}

type FieldType = {
  username: string;
  fullName: string;
  address: string;
  phone: string;
};

const UpdateUserModal = (props: IProps) => {
  const { notification, message } = App.useApp();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {
    openUpdateModal,
    setOpenUpdateModal,
    fetchUsers,
    dataUpdate,
    setDataUpdate,
  } = props;

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        username: dataUpdate.username,
        fullName: dataUpdate.fullName,
        address: dataUpdate.address,
        phone: dataUpdate.phone,
      });
    }
  }, [dataUpdate]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const { fullName, address, phone } = values;
    setLoading(true);
    try {
      const res = await updateUserApi(dataUpdate.id, fullName, address, phone);

      if (res?.data) {
        message.success("Cập nhật người dùng thành công");
        setOpenUpdateModal(false);
        await fetchUsers();
        form.resetFields();
        setDataUpdate(null);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        "Có lỗi xảy ra";

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
      title="Cập nhật người dùng"
      maskClosable={false}
      open={openUpdateModal}
      onOk={() => form.submit()}
      onCancel={() => {
        setOpenUpdateModal(false);
        form.resetFields();
        setDataUpdate(null);
      }}
      okText={"Cập nhật"}
      okButtonProps={{ loading: loading }}
    >
      <Form
        name="update-user"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item<FieldType> label="Username" name="username">
              <Input disabled />
            </Form.Item>
          </Col>
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
              label="Address"
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Số điện thoại chỉ được chứa số",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
