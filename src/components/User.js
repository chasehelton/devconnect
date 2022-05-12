import { useState, useEffect } from "react";
import Bio from "./Bio.js";
import PinnedRepos from "./PinnedRepos.js";
import Issues from "./Issues.js";

export default function User({ idx, username, usernames, setUsernames }) {
  const [userScore, setUserScore] = useState(0);
  return (
    <div
      key={username}
      style={{
        width: "400px",
        backgroundColor: "#eee",
        padding: "10px",
        margin: "10px",
      }}
    >
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", maxHeight: "20px"}}>
        <p>{username}</p>
        <button
          style={{
            backgroundColor: "#f00",
            color: "#fff",
            paddingLeft: "5px",
            paddingRight: "5px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
          onClick={() => {
            const temp = [...usernames];
            temp.splice(idx, 1);
            setUsernames(temp);
          }}
        >
          x
        </button>
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <p>Score:</p>
        {userScore < 90 && userScore >= 100 && (
          <p style={{ fontWeight: "bold", color: "darkgreen" }}>{userScore}%</p>
        )}
        {userScore < 90 && userScore >= 75 && (
          <p style={{ fontWeight: "bold", color: "green" }}>{userScore}%</p>
        )}
        {userScore < 75 && userScore >= 50 && (
          <p style={{ fontWeight: "bold", color: "yellow" }}>{userScore}%</p>
        )}
        {userScore < 50 && userScore >= 25 && (
          <p style={{ fontWeight: "bold", color: "orange" }}>{userScore}%</p>
        )}
        {userScore < 25 && userScore >= 0 && (
          <p style={{ fontWeight: "bold", color: "red" }}>{userScore}%</p>
        )}
      </div>

      <Bio username={username} setUserScore={setUserScore} />
      <PinnedRepos username={username} setUserScore={setUserScore} />
      <Issues username={username} setUserScore={setUserScore} />
    </div>
  );
}
