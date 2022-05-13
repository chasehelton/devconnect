import User from "./User.js";

export default function UserList({ usernames, setUsernames }) {
  // Add DnD functionality to the list
  return (
    <div className="flex flex-row flex-wrap">
      {usernames.map((username, idx) => (
        <User
          idx={idx}
          username={username}
          usernames={usernames}
          setUsernames={setUsernames}
        />
      ))}
    </div>
  );
}
