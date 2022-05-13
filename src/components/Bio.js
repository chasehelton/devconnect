import React, { useState } from "react";
import { useQuery } from "urql";
import Score from "./Score.js";

export default function Bio({ username, setUsernames, bioScore, setBioScore }) {
  // const [connections, setConnections] = useState([]);
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
              login
            }
          }
          totalCount
        }
        following(first: 10){
          edges{
            node{
              url
              name
              login
            }
          }
          totalCount
        }
      }
    }
  `,
  });
  const { data, fetching, error } = result;
  // const calculateScore = (data) => {
  //   let score = 0;
  //   score += data.user.avatarUrl ? 1 : 0;
  //   score += data.user.name ? 1 : 0;
  //   score += data.user.login ? 1 : 0;
  //   score += data.user.bio ? 1 : 0;
  //   score += data.user.company ? 1 : 0;
  //   score += data.user.location ? 1 : 0;
  //   score += data.user.email ? 1 : 0;
  //   score += data.user.followers.totalCount / 10;
  //   score += data.user.following.totalCount / 10;
  //   setBioScore(score / 9);
  // };
  // if (data) calculateScore(data);
  if (error) {
    alert(error.message);
    return null;
  }
  if (fetching) return <p>Loading...</p>;

  let connections = [];

  if (data) {
    if (data.user.followers.totalCount > 0) {
      let followers = data.user.followers.edges.filter(
        (user) => user.node.name !== null
      );
      followers.forEach((follower) => connections.push(follower.node));
    }
    if (data.user.following.totalCount > 0) {
      let following = data.user.following.edges.filter(
        (user) => user.node.name !== null
      );
      following.forEach((following) => {
        if (
          !connections.some(
            (connection) => connection.login === following.node.login
          )
        ) {
          connections.push(following.node);
        }
      });
    }
  }
  return (
    <div>
      {data && (
        <div>
          {/* <Score score={bioScore * 100} /> */}
          {data.user.bio && (
            <div className="my-3">
              <p className="font-bold">Bio</p>
              <p>{data.user.bio}</p>
            </div>
          )}
          {(data.user.company || data.user.location || data.user.email) && (
            <div className="my-3">
              <p className="font-bold">User Info</p>
              <ul>
                {data.user.company && (
                  <li>
                    <p>Company - {data.user.company}</p>
                  </li>
                )}
                {data.user.location && (
                  <li>
                    <p>Location - {data.user.location}</p>
                  </li>
                )}
                {data.user.email && (
                  <li>
                    <p>Email - {data.user.email}.</p>
                  </li>
                )}
              </ul>
            </div>
          )}
          {connections.length > 0 && (
            <div className="my-3">
              <p className="font-bold">Connections (click to compare)</p>
              <ul>
                {connections.map((connection) => (
                  <li className="" key={connection.login}>
                    <button
                      className="text-blue-500"
                      onClick={() =>
                        setUsernames((usernames) => [
                          ...usernames,
                          connection.login,
                        ])
                      }
                    >
                      {connection.name}
                    </button>
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
