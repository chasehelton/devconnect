import React from "react";
import { useQuery } from "urql";

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

  if (error) {
    return null;
  }
  if (fetching) return <p>Loading...</p>;
  
  return (
    <div>
      {data && (
        <div className="my-3">
          <p className="font-bold">Pinned Repos</p>
          {data.user.pinnedItems.edges.length === 0 && <p className="my-3">User has no pinned repos.</p>}
          <ul>
            {data.user.pinnedItems.edges.map((repo) => (
              <li className="p-2" key={repo.node.name}>
                <a className="font-bold text-blue-600" href={repo.node.url} target="_blank" rel="noreferrer">{repo.node.name}</a>
                <p>{repo.node.description ? repo.node.description : "No description."}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
