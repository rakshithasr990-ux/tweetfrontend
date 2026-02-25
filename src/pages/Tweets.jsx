import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../pages/Navbar";

export default function Tweets() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:7000/tweet/get-tweet");

      if (res.data.success) {
        setTweets(res.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch tweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar onRefresh={fetchTweets} />

      <div style={{ padding: "20px" }}>
        <h2>All Tweets</h2>

        {loading && <p>Loading tweets...</p>}

        {!loading && tweets.length === 0 ? (
          <p>No tweets found</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {tweets.map((t) => (
              <div
                key={t._id}
                style={{
                  width: "300px",
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  backgroundColor: "#fff",
                }}
              >
                <h4 style={{ marginBottom: "5px" }}>
                  {t.user?.name}{" "}
                  <span style={{ fontSize: "13px", color: "gray" }}>
                    ({t.user?.email})
                  </span>
                </h4>

                <p style={{ marginBottom: "10px" }}>
                  {t.tweetData}
                </p>

                {t.image && (
                  <>
                  <img
                    src={`http://localhost:7000/uploads/${t.image}`}
                    alt="tweet"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      marginBottom: "10px",
                    }}
                  />
                  <button style={{marginLeft:"10px"}} onClick={() => window.open(`http://localhost:7000/uploads/${t.image}`, "_blank")}>View  Full Image</button>
                  </>
                )}

                <p
                  style={{
                    fontSize: "12px",
                    color: "gray",
                    marginTop: "10px",
                  }}
                >
                  Posted: {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}