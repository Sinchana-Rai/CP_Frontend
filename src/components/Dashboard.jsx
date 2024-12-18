import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const baseURL = 'https://cp-backend-uqux.onrender.com'
// const baseURL = 'http://localhost:5000'

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [updateMsgId, setupdateMsgId] = useState(null);

  const [changedMsg, setchangedMsg] = useState({ name: "", email: "", subject: "", message: "", });
 
  const displayUsers = async () => {
    try {
    //   const response = await axios.get("http://localhost:5000/user/allusers");
        const response = await axios.get(`${baseURL}/user/allusers`)
      setUsers(response.data.data);
    } catch (error) {
      toast.error("Error displaying users");
      console.error("Error displaying users:", error);
     }
  };

 
  const displayMessages = async () => {
    try {
    //   const response = await axios.get("http://localhost:5000/contactus/messages");
    const response = await axios.get(`${baseURL}/contactus/messages`)
      setMessages(response.data.data); 
    } catch (error) {
      toast.error("Error displaying messages");
      console.error("Error displaying messages:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
    //   await axios.delete(`http://localhost:5000/user/${id}`);

    await axios.delete(`${baseURL}/user/${id}`)
      toast.success("User deleted");
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      toast.error("Cannot delete user");
      console.error("Cannot delete user:", error);
    }
  };

  const deleteMessage = async (id) => {
    try {
    //   await axios.delete(`http://localhost:5000/contactus/${id}`);

    await axios.delete(`${baseURL}/contactus/${id}`);
      toast.success("Message deleted");
      setMessages(messages.filter((message) => message._id !== id));
    } catch (error) {
      toast.error("Cannot delete message");
      console.error("Cannot delete message:", error);
    }
  };

  const handleUpdateMessage = (message) => {
    setupdateMsgId(message._id);
    setchangedMsg({
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
    });
  };

  const saveUpdatedMessage = async () => {
    try {
        
      await axios.put(`${baseURL}/contactus/update/${updateMsgId}`, changedMsg);
      toast.success("Message updated !");
      setupdateMsgId(null);
      displayMessages(); 
    } catch (error) {
      toast.error("Update message error");
      console.error("Update message error:", error);
    }
  };

  const cancelUpdate = () => {
    setupdateMsgId(null);
  };

  useEffect(() => {
    displayUsers();
    displayMessages();
  }, []);

  return (
    <div className="dashboard container" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="displayInfo">
        <div className="item">
          <h2>Admin Dashboard</h2>

          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email-id</th>
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
          <br />
            <hr style={{ width:"100%"}} />

          <h3>Contact Messages</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
    <tbody>
    
  {messages.map((message) => (
    <tr key={message._id}>
      {updateMsgId === message._id ? (
        <>
          <td><input type="text" value={changedMsg.name} onChange={(e) => 
            setchangedMsg({ ...changedMsg, name: e.target.value })} /></td>
          <td><input type="email" value={changedMsg.email} onChange={(e) => 
            setchangedMsg({ ...changedMsg, email: e.target.value })} /></td>
          <td><input type="text" value={changedMsg.subject} onChange={(e) => 
            setchangedMsg({ ...changedMsg, subject: e.target.value })} /></td>
          <td><input type="text" value={changedMsg.message} onChange={(e) =>
             setchangedMsg({ ...changedMsg, message: e.target.value })} /></td>

          <td>
            <button onClick={saveUpdatedMessage}>Save</button>
            <button onClick={cancelUpdate}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{message.name}</td>
          <td>{message.email}</td>
          <td>{message.subject}</td>
          <td>{message.message}</td>
          <td>
            <button onClick={() => handleUpdateMessage(message)}>Edit</button>

            <button onClick={() => deleteMessage(message._id)}>Delete</button>
          </td>
        </>
      )}
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
