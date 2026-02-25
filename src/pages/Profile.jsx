import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem("myToken");

    if (!token) {
      alert("Please Login first");
      navigate("/login");
      return; 
    }

    try {
      const res = await axios.get("http://localhost:7000/api/profile", {
        headers: {
          "auth-token": token, 
        },
      });

      if (res.data.success) {

        setUser(res.data.data);
      } else {
        alert(res.data.message); 
      }

    } catch (error) {
      console.log(error);
      alert("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("myToken");
    navigate("/login");
  };

  return (
    <div style={{padding:"20px"}}>
      <h1>My Profile</h1>

      {!user ? (
        <p>Loading Profile...</p>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>

          <div>
            <button onClick={() => navigate("/createtweets")}>Go to Tweet</button>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
