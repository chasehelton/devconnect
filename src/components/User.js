import { useState } from "react";
import UserHeader from "./UserHeader.js";
import Social from "./Social.js";
import Code from "./Code.js"

export default function User({ idx, username, usernames, setUsernames, setMaxUsersReached, setUserAlreadyAdded }) {
  const [selectedHeader, setSelectedHeader] = useState("Social");

  return (
    <div
      key={username}
      className="w-96 sm:max-w-md p-2 m-2 rounded-xl bg-white shadow-xl border-2 border-gray-200"
    >
      <UserHeader
        idx={idx}
        username={username}
        usernames={usernames}
        setUsernames={setUsernames}
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
      />
      {selectedHeader === "Social" && (
        <Social
          username={username}
          usernames={usernames}
          setUsernames={setUsernames}
          setMaxUsersReached={setMaxUsersReached}
          setUserAlreadyAdded={setUserAlreadyAdded}
        />
      )}
      {selectedHeader === "Code" && (
        <Code username={username}/>
      )}
    </div>
  );
}
