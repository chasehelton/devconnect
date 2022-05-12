import React, { useState } from "react";
import { useQuery } from "urql";
import Score from "./Score.js";

export default function Bio({ username, bioScore, setBioScore }) {
  const [result] = useQuery({
    query: `
    query {
      user(login: "${username}") {
        avatarUrl
        name
        login
        bio
        company
        location
        email
        followers(first: 10) {
          edges {
            node {
              url
              name
            }
          }
          totalCount
        }
        following(first: 10){
          edges{
            node{
              url
              name
            }
          }
          totalCount
        }
      }
    }
  `,
  });
  const { data, fetching, error } = result;
  const calculateScore = (data) => {
    let score = 0;
    score += data.user.avatarUrl ? 1 : 0;
    score += data.user.name ? 1 : 0;
    score += data.user.login ? 1 : 0;
    score += data.user.bio ? 1 : 0;
    score += data.user.company ? 1 : 0;
    score += data.user.location ? 1 : 0;
    score += data.user.email ? 1 : 0;
    score += data.user.followers.totalCount / 10;
    score += data.user.following.totalCount / 10;
    setBioScore(score / 9);
  };
  if (data) calculateScore(data);
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div>
      {data && (
        <div>
          <Score score={bioScore * 100} />
          <h1>Hey, I'm {data.user.name}</h1>
          <p>Bio: {data.user.bio}</p>
          <p>Company: {data.user.company}.</p>
          <p>Location: {data.user.location}.</p>
          {data.user.email && <p>Email: {data.user.email}.</p>}
          {data &&
            data.user.followers.edges.filter((user) => user.node.name !== null)
              .length > 0 && (
              <div>
                <h2>
                  Followers (
                  {
                    data.user.followers.edges.filter(
                      (user) => user.node.name !== null
                    ).length
                  }
                  )
                </h2>
                <ul>
                  {data.user.followers.edges
                    .filter((user) => user.node.name !== null)
                    .map((user) => (
                      <li key={user.node.name}>
                        <a
                          href={user.node.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {user.node.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          {data &&
            data.user.following.edges.filter((user) => user.node.name !== null)
              .length > 0 && (
              <div>
                <h2>
                  Following (
                  {
                    data.user.following.edges.filter(
                      (user) => user.node.name !== null
                    ).length
                  }
                  )
                </h2>
                <ul>
                  {data.user.following.edges
                    .filter((user) => user.node.name !== null)
                    .map((user) => (
                      <li key={user.node.name}>
                        <a
                          href={user.node.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {user.node.name ? user.node.name : ""}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
