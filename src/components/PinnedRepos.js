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
  // const calculateScore = (data) => {
  //   let score = 0;
  //   score += data.user.pinnedItems.edges.length > 0 ? 1 : 0;
  //   data.user.pinnedItems.edges.forEach((repo) => {
  //     score += repo.node.description ? 1 : 0;
  //     score += repo.node.name ? 1 : 0;
  //     score += repo.node.homepageUrl ? 1 : 0;
  //     score += repo.node.url ? 1 : 0;
  //   });
  //   setRepoScore(score / (1 + data.user.pinnedItems.edges.length * 4));
  // };
  // if (data) calculateScore(data);
  if (error) {
    return null;
  }
  if (fetching) return <p>Loading...</p>;
  
  return (
    <div>
      {data && (
        <div>
          {/* <Score score={repoScore * 100} />
          {repoScore === 0 && <p>No pinned repos found.</p>} */}
          {data.user.pinnedItems.edges.length === 0 && <p>User has no pinned repos.</p>}
          <ul>
            {data.user.pinnedItems.edges.map((repo) => (
              <li className="p-2" key={repo.node.name}>
                <a className="font-bold text-blue-600" href={nodeOrNotFound(repo.node.url)}>{repo.node.name}</a>
                <p>{nodeOrNotFound(repo.node.description)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const nodeOrNotFound = (node) => (node ? node : "Not found");
