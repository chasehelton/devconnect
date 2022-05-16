import User from "./User.js";

export default function UserList({ usernames, setUsernames, setMaxUsersReached, setUserAlreadyAdded }) {
  document.title = "devconnect | Home";
  return (
    <div className="flex flex-row flex-wrap justify-center max-w-7xl mx-auto">
      {usernames.length > 0 && usernames.map((username, idx) => (
        <User
          key={username}
          idx={idx}
          username={username}
          usernames={usernames}
          setUsernames={setUsernames}
          setMaxUsersReached={setMaxUsersReached}
          setUserAlreadyAdded={setUserAlreadyAdded}
        />
      ))}
      {usernames.length < 1 && (
        <p className="flex justify-center text-center text-gray-600">Add GitHub users by their username via the text input above.</p>
      )}
    </div>
  );
}
