import React from 'react';
import { useQuery } from 'urql';

const IssuesQuery = `
query { 
  user(login: "chasehelton") {
    issues(last: 10, orderBy: {field: CREATED_AT, direction:DESC }){
      nodes{
        title,
        body,
        closedAt
      }
    }
  }
}
`;

export default function Issues() {
  const [result, reexecuteQuery] = useQuery({
    query: IssuesQuery,
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div>
      <h1>Pinned Repos</h1>
      <ul>
        {data.user.issues.nodes.map((issue) => (
            <li key={issue.title}>
                <p>{issue.title}</p>
                <p>{issue.body}</p>
                <p>{issue.closedAt}</p>
            </li>
        ))}
      </ul>
    </div>
  );
}
