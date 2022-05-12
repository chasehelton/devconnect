import React from 'react';
import { useQuery } from 'urql';

export default function Bio({ username }) {
  const [result] = useQuery({ query: `
    query {
      user(login: "${username}") {
        name
        login
        bio
        company
        location
      }
    }
  `});
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div>
        <h1>Hey, I'm {data.user.name}</h1>
        <p>Bio: {data.user.bio}</p>
        <p>Company: {data.user.company}.</p>
        <p>Location: {data.user.location}.</p>
    </div>
  );
}
