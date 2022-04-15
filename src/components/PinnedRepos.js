import React from 'react';
import { useQuery } from 'urql';

export default function PinnedRepos() {
  const PinnedReposQuery = `
    query PinnedRepos {
      user(login: "chasehelton") {
        pinnedItems(first: 3) {
          edges {
            node {
              ... on Repository {
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
  `;
  const [result, reexecuteQuery] = useQuery({
    query: PinnedReposQuery,
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div>
      <h1>Pinned Repos</h1>
      <ul>
        {data.user.pinnedItems.edges.map((repo) => (
          <li key={repo.node.name}>
            <a href={repo.node.url}>{repo.node.name}</a>
            <p>{repo.node.description}</p>
            <p>{repo.node.pushedAt}</p>
            <p>{repo.node.homepageUrl}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
