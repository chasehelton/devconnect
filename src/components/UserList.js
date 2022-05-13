import User from "./User.js";

export default function UserList({ usernames, setUsernames, setMaxUsersReached, setUserAlreadyAdded }) {
  // Add DnD functionality to the list

  return (
    <div className="flex flex-row flex-wrap justify-center max-w-7xl mx-auto mt-32 sm:mt-20">
      {usernames.length > 0 && usernames.map((username, idx) => (
        <User
          idx={idx}
          username={username}
          usernames={usernames}
          setUsernames={setUsernames}
          setMaxUsersReached={setMaxUsersReached}
          setUserAlreadyAdded={setUserAlreadyAdded}
        />
      ))}
    </div>
  );
}
