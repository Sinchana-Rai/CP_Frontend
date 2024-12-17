import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const baseURL = 'https://cp-backend-uqux.onrender.com'

const ContactUs = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // await axios
    //   .post(
    //     "http://localhost:5000/contactus/sendmessage",
    //     { name, email, subject, message, },
    //     { withCredentials: true, headers: { "Content-Type": "application/json" },
    //     })

       await axios
      .post(
        `${baseURL}/contactus/sendmessage`,
        { name, email, subject, message, },
        { withCredentials: true, headers: { "Content-Type": "application/json" },
        })

      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setMessage("");
        setSubject("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className="contact container">
        <div className="displayInfo">
          <div className="item">
            <h4>Address:</h4>
            <p>Street Name, City 45044</p>
          </div>
          <div className="item">
            <h4>Call Us</h4>
            <p>Call Us: +1 513 000 0000</p>
          </div>
          <div className="item">
            <h4>Mail Us @</h4>
            <p>ss@gmail.com</p>
          </div>
        </div>
        <div className="displayInfo">
          <div className="item">
            <form onSubmit={handleSendMessage}>
              <h4>Send a Message</h4>
              <div>
                <input
                  type="text" placeholder="Name" value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email" placeholder="E-mail Id" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="text" placeholder="Subject" value={subject}
                onChange={(e) => setSubject(e.target.value)} />
              <textarea
                rows={5} placeholder="Message" value={message}
                onChange={(e) => setMessage(e.target.value)} />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}

export default ContactUs;