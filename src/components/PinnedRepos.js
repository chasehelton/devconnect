import React from 'react';
import { useQuery } from 'urql';

export default function PinnedRepos({username}) {
  const [result] = useQuery({ query: `
    query {
      user(login: "${username}") {
        pinnedItems(first: 10) {
          edges {
            node {
              ... on Repository {
                id
                name
                description
                pushedAt
                url
                homepageUrl
              }
            }
          }
        }
      }
    }
  `});
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div>
      <h1>Pinned Repos</h1>
      <ul>
        {data.user.pinnedItems.edges.map((repo) => (
          <li key={repo.node.name}>
            <p>URL: <a href={nodeOrNotFound(repo.node.url)}>Link</a></p>
            <p>Name: {nodeOrNotFound(repo.node.name)}</p>
            <p>Description: {nodeOrNotFound(repo.node.description)}</p>
            <p>Last Pushed: {repo.node.pushedAt ? `${new Date(repo.node.pushedAt).toLocaleString()}` : "Not found"}</p>
            <p>Homepage URL: {nodeOrNotFound(repo.node.homepageUrl)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const nodeOrNotFound = (node) => (node ? node : "Not found");