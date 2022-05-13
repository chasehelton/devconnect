import { useQuery } from "urql";
import Score from "./Score.js";

export default function UserHeader({
  idx,
  username,
  usernames,
  setUsernames,
  userScore,
}) {
  const [result] = useQuery({
    query: `
        query {
          user(login: "${username}") {
            avatarUrl
            login
            email
            name
            url
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
  
  return (
    <>
      {data && (
        <div className="flex flex-row justify-between">
          <a href={data.user.url} target="_blank" rel="noreferrer">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row my-2">
                <img
                  className="rounded-full mx-2"
                  src={data.user.avatarUrl}
                  alt={data.user.name}
                  width="50"
                />
                <div className="flex flex-col">
                  <a href={data.user.url} target="_blank" rel="noreferrer"><p className="font-bold text-blue-500">{data.user.login}</p></a>
                  <p>{data.user.name}</p>
                  {/* <Score score={userScore} /> */}
                </div>
              </div>
            </div>
          </a>
          <button
            className="text-text-slate-500 hover:text-slate-300 h-8 font-bold text-xs rounded"
            onClick={() => {
              const temp = [...usernames];
              temp.splice(idx, 1);
              setUsernames(temp);
            }}
          >
            Remove
          </button>
        </div>
      )}
    </>
  );
}
