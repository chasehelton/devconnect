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
          }
        }
      `,
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <div>
      <button
        className="bg-slate-300 hover:bg-slate-400 text-white font-bold py-1 px-2 rounded"
        onClick={() => {
          const temp = [...usernames];
          temp.splice(idx, 1);
          setUsernames(temp);
        }}
      >
        x
      </button>
      <div className="flex flex-row items-center my-3">
        <img
          className="rounded-full mx-2"
          src={data.user.avatarUrl}
          alt={data.user.name}
          width="50"
        />
        <div className="flex flex-col">
          <p className="font-bold">{data.user.login}</p>
          <Score score={userScore} />
        </div>
        {/* <p className="font-bold">{data.user.login}</p>
        <Score score={userScore} /> */}
        {/* <div className="flex flex-col justify-center self-end">
          {/* <p>Total Score:</p>
          
        </div> */}
      </div>
    </div>
  );
}
