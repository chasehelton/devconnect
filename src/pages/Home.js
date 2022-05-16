import { useState } from "react";
import { createClient, Provider } from "urql";
import TopBar from "../components/TopBar.js";
import UserList from "../components/UserList.js";
import Messages from "../pages/Messages.js";

const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` },
  },
});

export default function Home({ page }) {
  const [usernames, setUsernames] = useState([]);
  const [maxUsersReached, setMaxUsersReached] = useState(false);
  const [userAlreadyAdded, setUserAlreadyAdded] = useState(false);

  return (
    <Provider value={client}>
      <TopBar
        page={page}
        usernames={usernames}
        setUsernames={setUsernames}
        maxUsersReached={maxUsersReached}
        userAlreadyAdded={userAlreadyAdded}
        setUserAlreadyAdded={setUserAlreadyAdded}
      />
      <div className="mt-28 sm:mt-20">
        {page === "UserList" && (
          <UserList
            usernames={usernames}
            setUsernames={setUsernames}
            setMaxUsersReached={setMaxUsersReached}
            setUserAlreadyAdded={setUserAlreadyAdded}
          />
        )}
        {page === "Messages" && <Messages />}
      </div>
    </Provider>
  );
}
