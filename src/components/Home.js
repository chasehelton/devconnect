import { useState, useEffect } from "react";
import { createClient, Provider } from "urql";
import TopBar from "./TopBar.js";
import UserList from "./UserList.js";

const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` },
  },
});

export default function Home() {
  const [usernames, setUsernames] = useState([]);
  const [maxUsersReached, setMaxUsersReached] = useState(false);
  const [userAlreadyAdded, setUserAlreadyAdded] = useState(false);

  return (
    <Provider value={client}>
      <TopBar
        usernames={usernames}
        setUsernames={setUsernames}
        maxUsersReached={maxUsersReached}
        userAlreadyAdded={userAlreadyAdded}
        setUserAlreadyAdded={setUserAlreadyAdded}
      />
      <UserList
        usernames={usernames}
        setUsernames={setUsernames}
        setMaxUsersReached={setMaxUsersReached}
        setUserAlreadyAdded={setUserAlreadyAdded}
      />
    </Provider>
  );
}
