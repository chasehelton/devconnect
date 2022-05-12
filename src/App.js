import { React, useState, useEffect } from 'react';
import { createClient, Provider } from 'urql';

import Bio from "./components/Bio.js";
import PinnedRepos from "./components/PinnedRepos.js";
import Issues from "./components/Issues.js";
import Form from "./components/Form.js"

const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` }
  }
});

export default function App() {
  const [username, setUsername] = useState("");
  console.log(username);
  return (
    <>
      {username === "" ? (
        <Form setUsername={setUsername} />
      ) : (
        <Provider value={client}>
          <Bio username={username} />
          <PinnedRepos username={username} />
          <Issues username={username} />
        </Provider>
      )}
    </>
  );
}
