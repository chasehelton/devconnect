import { React, useState } from "react";
import { createClient, Provider } from "urql";
import "./index.css";

import TopBar from "./components/TopBar.js";
import UserList from "./components/UserList.js";

const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` },
  },
});

export default function App() {
  const [usernames, setUsernames] = useState([]);
  const [maxUsersReached, setMaxUsersReached] = useState(false);
  const [userAlreadyAdded, setUserAlreadyAdded] = useState(false);

  return (
    <Provider value={client}>
      <TopBar usernames={usernames} setUsernames={setUsernames} maxUsersReached={maxUsersReached} userAlreadyAdded={userAlreadyAdded} setUserAlreadyAdded={setUserAlreadyAdded} />
      <UserList usernames={usernames} setUsernames={setUsernames} setMaxUsersReached={setMaxUsersReached} setUserAlreadyAdded={setUserAlreadyAdded} />
    </Provider>
  );
}
