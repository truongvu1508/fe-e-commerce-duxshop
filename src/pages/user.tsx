import { App, Button, Popconfirm, Table, type TableProps } from "antd";
import { useEffect, useState } from "react";
import { deleteUsersApi, getUsersApi } from "../services/api";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CreateUserModal from "../components/modal/create.user.modal";
import UpdateUserModal from "../components/modal/update.user.modal";

type IUser = {
  id: string;
  username: string;
  fullName: string;
  address: string;
  phone: string;
};

const UserPage = () => {
  const { message } = App.useApp();
  const [users, setUsers] = useState<IUser[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

  const fetchUsers = async () => {
    const res = await getUsersApi();
    if (res?.data?.data) {
      setUsers(res.data.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <>
            <EditOutlined
              onClick={() => handleClickEdit(record)}
              style={{ cursor: "pointer", color: "orange", marginRight: 10 }}
            />
            <Popconfirm
              title="Xóa người dùng"
              description="Bạn có chắc chắn muốn xóa người dùng này không?"
              onConfirm={() => handleClickDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleClickEdit = (data: IUser) => {
    setDataUpdate(data);
    setOpenUpdateModal(true);
  };

  const handleClickDelete = async (data: IUser) => {
    const res = await deleteUsersApi(data.id);
    if (res.data) {
      message.success("Xóa người dùng thành công!");
      await fetchUsers();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Users</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreateModal(true)}
        >
          Add new
        </Button>
      </div>
      <Table dataSource={users} columns={columns} bordered rowKey={"id"} />;{" "}
      <CreateUserModal
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        fetchUsers={fetchUsers}
      />
      <UpdateUserModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        fetchUsers={fetchUsers}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </div>
  );
};

export default UserPage;
