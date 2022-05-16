import { useState } from "react";
import UserHeader from "./UserHeader.js";
import Social from "./Social.js";
import Code from "./Code.js";

export default function User({
  idx,
  username,
  usernames,
  setUsernames,
  setMaxUsersReached,
  setUserAlreadyAdded,
}) {
  const [selectedHeader, setSelectedHeader] = useState("Social");

  return (
    <div className="w-full sm:w-96 sm:max-w-md px-2 sm:p-2 sm:m-2 rounded-none sm:rounded-xl bg-white sm:shadow-xl border-b-4 sm:border-2 border-gray-400 sm:border-gray-200">
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
      {selectedHeader === "Code" && <Code username={username} />}
    </div>
  );
}
