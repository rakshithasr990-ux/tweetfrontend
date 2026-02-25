import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTweet() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tweetData: "",
    image: "",
  });
const [tweetData,setTweetData]=useState("");
const [image,setImage]=useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("myToken");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("tweetData", tweetData);
      formData.append("image", image);

      const res = await axios.post(
        "http://localhost:7000/tweet/post",
        formData,
        {
          headers: {
            "auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        navigate("/tweets");
      } else {
        alert(res.data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Tweet post failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Tweet</h2>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "10px" }}>
          <label>Tweet Text</label>
          <textarea
            name="tweetData"
            value={tweetData}
            onChange={(e) => setTweetData(e.target.value)}
            placeholder="What's happening?"
            rows={4}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image URL (Optional)</label>
          <input
            type="file"
            name="image"
            style={{ width: "100%" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">Post Tweet</button>

      </form>
    </div>
  );
}