import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Container } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/admin/api/users", {
        headers: { Authorization: `${token}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("lỗi load dữ liệu");
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:5000/admin/api/user/${userId}`, {
        headers: { Authorization: `${token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <Container className="recipe-management">
      <h2 className="mb-4 text-center">Quản lý người dùng</h2>

      <ListGroup>
        {users.length === 0 ? <p>Không có người dùng nào.</p> : null}
        {users.map((users) => (
          <ListGroup.Item key={users._id} className="d-flex justify-content-between align-items-center">
            <span>
              <strong>{users.username}</strong>
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(users._id)}>
              Xóa
            </button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserList;
