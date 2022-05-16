import { useQuery } from "urql";
import { useAuth } from "../contexts/AuthProvider.js";
import UserIcons from "./UserIcons.js";
import { GET_BASIC_USER } from "../graphql/queries.js";

export default function UserHeader({
  idx,
  username,
  usernames,
  setUsernames,
  selectedHeader,
  setSelectedHeader,
}) {
  const { user } = useAuth();
  const variables = { username: username };
  const [result] = useQuery({
    query: GET_BASIC_USER,
    variables,
  });
  const { data, fetching, error } = result;
  if (error) return null;
  if (fetching) return <p>Loading...</p>;

  return (
    <>
      {data && (
        <div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row my-2">
                <a href={data.user.url} target="_blank" rel="noreferrer">
                  <img
                    className="rounded-full mx-2"
                    src={data.user.avatarUrl}
                    alt={data.user.name}
                    width="50"
                  />
                </a>
                <div className="flex flex-col">
                  <a href={data.user.url} target="_blank" rel="noreferrer">
                    <p className="font-bold text-blue-500 hover:text-blue-300">
                      {data.user.login}
                    </p>
                  </a>
                  <p>{data.user.name}</p>
                </div>
              </div>
            </div>
            <UserIcons
              user={user}
              data={data}
              idx={idx}
              username={username}
              usernames={usernames}
              setUsernames={setUsernames}
            />
          </div>
          {!fetching && (<div className="flex flex-row justify-around">
            <button
              className={`${
                selectedHeader === "Social"
                  ? "bg-slate-600 text-white"
                  : "bg-slate-200"
              } w-full`}
              onClick={() => setSelectedHeader("Social")}
            >
              Social
            </button>
            <button
              className={`${
                selectedHeader === "Code"
                  ? "bg-slate-600 text-white"
                  : "bg-slate-200"
              } w-full`}
              onClick={() => setSelectedHeader("Code")}
            >
              Code
            </button>
          </div>)}
        </div>
      )}
    </>
  );
}
