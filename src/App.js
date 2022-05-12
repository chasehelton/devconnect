import { React, useState, useEffect } from "react";
import { createClient, Provider } from "urql";

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
      {usernames.length < 4 && (
        <div>
          <p>Add up to 4 GitHub users</p>
          <Form setUsernames={setUsernames} />
        </div>
      )}
      {usernames.length === 4 && (
        <p>Maximum users reached. Please remove a user to add a new one.</p>
      )}
      <UserList usernames={usernames} setUsernames={setUsernames} />
    </Provider>
  );
}
