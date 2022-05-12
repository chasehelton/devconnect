import { React, useState, useEffect } from 'react';
import { createClient, Provider } from 'urql';

import Bio from "./components/Bio.js";
import PinnedRepos from "./components/PinnedRepos.js";
import Issues from "./components/Issues.js";
import Form from "./components/Form.js";

const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` }
  }
});

export default function App() {
  const [usernames, setUsernames] = useState([]);

  return (
    <Provider value={client}>
      <Form setUsernames={setUsernames} />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        {usernames.map((username) => (
          <div key={username}>
            {/* <button onClick={() => {
              console.log(username);
              setUsernames(usernames.filter(item => item.name !== username))
            }}>X</button> */}
            <Bio username={username} />
            <PinnedRepos username={username} />
            <Issues username={username} />
          </div>
        ))}
      </div>
    </Provider>
  );
}
