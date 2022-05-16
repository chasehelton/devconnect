import User from "./User.js";
import { useAuth } from "../contexts/AuthProvider.js";
export default function UserList({
  usernames,
  setUsernames,
  setMaxUsersReached,
  setUserAlreadyAdded,
  addUserToList,
  userNotFound,
}) {
  document.title = "devconnect | Home";
  const { user } = useAuth();
  return (
    <div className="flex flex-row flex-wrap justify-center sm:max-w-7xl sm:mx-auto">
      {usernames.length > 0 &&
        usernames.map((username, idx) => (
          <User
            key={username}
            idx={idx}
            username={username}
            usernames={usernames}
            setUsernames={setUsernames}
            setMaxUsersReached={setMaxUsersReached}
            setUserAlreadyAdded={setUserAlreadyAdded}
            addUserToList={addUserToList}
          />
        ))}
      {user && usernames.length < 1 && (
        <p className="flex justify-center text-center text-gray-600 mx-4">
          Add GitHub users by their username via the text input above. Try
          searching your own!
        </p>
      )}
    </div>
  );
}
