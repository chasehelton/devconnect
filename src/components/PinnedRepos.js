import React from "react";
import { useQuery } from "urql";
import Score from "./Score.js";

export default function PinnedRepos({ username, repoScore, setRepoScore }) {
  const [result] = useQuery({
    query: `
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
  `,
  });
  const { data, fetching, error } = result;

  const calculateScore = (data) => {
    let score = 0;
    score += data.user.pinnedItems.edges.length > 0 ? 1 : 0;
    data.user.pinnedItems.edges.forEach((repo) => {
      score += repo.node.description ? 1 : 0;
      score += repo.node.name ? 1 : 0;
      score += repo.node.homepageUrl ? 1 : 0;
      score += repo.node.url ? 1 : 0;
    });
    setRepoScore(score / (1 + data.user.pinnedItems.edges.length * 4));
  };

  if (data) calculateScore(data);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div>
      <Score score={repoScore * 100} />
      <ul>
        {data.user.pinnedItems.edges.map((repo) => (
          <li key={repo.node.name}>
            <p>
              URL: <a href={nodeOrNotFound(repo.node.url)}>Link</a>
            </p>
            <p>Name: {nodeOrNotFound(repo.node.name)}</p>
            <p>Description: {nodeOrNotFound(repo.node.description)}</p>
            <p>
              Last Pushed:{" "}
              {repo.node.pushedAt
                ? `${new Date(repo.node.pushedAt).toLocaleString()}`
                : "Not found"}
            </p>
            <p>Homepage URL: {nodeOrNotFound(repo.node.homepageUrl)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const nodeOrNotFound = (node) => (node ? node : "Not found");
