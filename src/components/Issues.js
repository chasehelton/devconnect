import React from "react";
import { useQuery } from "urql";
import Score from "./Score.js";

export default function Issues({ username, issueScore, setIssueScore }) {
  const [result] = useQuery({
    query: `
    query { 
      user(login: "${username}") {
        issues(last: 10, orderBy: {field: CREATED_AT, direction:DESC }){
          nodes{
            title,
            body,
            closedAt,
            closed,
            repository{
              name,
              url,
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
  //   data.user.issues.nodes.forEach((issue) => {
  //     score += issue.title ? 1 : 0;
  //     score += issue.body ? 1 : 0;
  //     score += issue.closed ? 1 : 0;
  //   });
  //   setIssueScore(score / (data.user.issues.nodes.length * 3));
  // };
  // if (data) calculateScore(data);
  if (error) {
    alert(error.message);
    return null;
  }
  if (fetching) return <p>Loading...</p>;
  return (
    <div>
      {data && (
        <div>
          {/* <Score score={issueScore * 100} />
          {issueScore === 0 && <p>No issues found.</p>} */}
          <ul>
            {data.user.issues.nodes.map((issue) => (
              <li key={issue.title}>
                <p>{issue.title}</p>
                <p>
                  {issue.closedAt
                    ? `Closed at: ${new Date(issue.closedAt).toLocaleString()}`
                    : "Not closed"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
