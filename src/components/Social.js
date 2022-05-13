import React from "react";
import { useQuery } from "urql";

export default function Social({
  username,
  usernames,
  setUsernames,
  setMaxUsersReached,
  setUserAlreadyAdded,
}) {
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
        websiteUrl
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

  if (error) {
    alert(error.message);
    return null;
  }
  if (fetching) return <p>Loading...</p>;

  let connections = [];

  if (data) {
    console.log(data.user.websiteUrl);
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
          {data.user.bio && (
            <div className="my-3">
              <p className="font-bold">Bio</p>
              <p className="pl-2">{data.user.bio}</p>
            </div>
          )}
          {(data.user.company || data.user.location || data.user.email) && (
            <div className="my-3">
              <p className="font-bold">User Info</p>
              <ul>
                {data.user.company && (
                  <li className="pl-2">
                    <p>Company - {data.user.company}</p>
                  </li>
                )}
                {data.user.location && (
                  <li className="pl-2">
                    <p>Location - {data.user.location}</p>
                  </li>
                )}
                {data.user.email && (
                  <li className="pl-2">
                    <p>Email - {data.user.email}.</p>
                  </li>
                )}
                {data.user.websiteUrl && (
                  <li className="pl-2">
                    <a
                      href={`https://${data.user.websiteUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="font-bold text-blue-500 hover:text-blue-300">
                        {data.user.websiteUrl}
                      </p>
                    </a>
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
                  <li className="pl-2" key={connection.login}>
                    <button
                      className={
                        usernames.includes(connection.login)
                          ? `font-bold text-blue-600`
                          : `text-blue-500`
                      }
                      onClick={() => {
                        if (usernames.length === 8) setMaxUsersReached(true);
                        else if (usernames.includes(connection.login))
                          setUserAlreadyAdded(true);
                        else {
                          setUsernames((usernames) => [
                            ...usernames,
                            connection.login,
                          ]);
                        }
                        setTimeout(() => {
                          setUserAlreadyAdded(false);
                          setMaxUsersReached(false);
                        }, 2000);
                      }}
                    >
                      {connection.name} ({connection.login})
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
