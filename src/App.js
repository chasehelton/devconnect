import { React, useState } from "react";
import { createClient, Provider } from "urql";
import "./index.css";

import Form from "./components/Form.js";
import UserList from "./components/UserList.js";

const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` },
  },
});

export default function App() {
  const [usernames, setUsernames] = useState([]);

  return (
    <Provider value={client}>
      <Form setUsernames={setUsernames} />
      <UserList usernames={usernames} setUsernames={setUsernames} />
    </Provider>
  );
}
