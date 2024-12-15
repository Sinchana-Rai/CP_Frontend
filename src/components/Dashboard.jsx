import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

   const displayUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/allusers");
      setUsers(response.data);
    } catch (error) {
       toast.error("Error displaying users") 
      console.error("Error displaying users:", error);
    }
  };

const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/${id}`);
      toast.success("User deleted");
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      toast.error("Cannot delete user"); 
      console.error("Cannot delete user:", error);
    }
  };

  useEffect(() => {
    displayUsers();
  }, []);

  return (
    <div className="dashboard container">
        <div className="banner">
        <div className="item">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email-id </th>
            <th>Action</th>
            
          </tr>
        </thead>
        
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
