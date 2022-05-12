import React, {useState} from 'react';
import { useQuery } from 'urql';

export default function Issues({username}) {
  const [showResults, setShowResults] = useState(false);
  const [result] = useQuery({ query: `
    query { 
      user(login: "${username}") {
        issues(last: 10, orderBy: {field: CREATED_AT, direction:DESC }){
          nodes{
            title,
            body,
            closedAt,
            repository{
              name,
              url,
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
      <div style={{display: "flex", flexDirection: "row"}}>
        <h1>
          Issues
          <button style={{ background: "none", border: "none", fontSize: "24px"}} onClick={() => setShowResults(!showResults)}>
            {showResults ? "-" : "+"}
          </button>
        </h1>
      </div>
      {showResults && (<ul>
        {data.user.issues.nodes.map((issue) => (
          <li key={issue.title}>
            <p>{issue.title}</p>
            {/* <p>{issue.body}</p> */}
            <p>{issue.closedAt ? `Closed at: ${new Date(issue.closedAt).toLocaleString()}` : "Not closed"}</p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
