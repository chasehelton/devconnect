import { React, useEffect } from 'react';
import { createClient, Provider } from 'urql';

import PinnedRepos from "./components/PinnedRepos.js";
import Issues from "./components/Issues.js";

const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` }
  }
});

export default function App() {
  return (
    <Provider value={client}>
      <PinnedRepos />
      <Issues />
    </Provider>
  );
}
