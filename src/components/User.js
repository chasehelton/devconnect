import { useState, useEffect } from "react";
import UserHeader from "./UserHeader.js";
import Bio from "./Bio.js";
import PinnedRepos from "./PinnedRepos.js";
import Issues from "./Issues.js";
import { useQuery } from "urql";

export default function User({ idx, username, usernames, setUsernames }) {
  // const [initialLoad, setInitialLoad] = useState(true);
  // const [userScore, setUserScore] = useState(-1);
  // const [bioScore, setBioScore] = useState(-1);
  // const [repoScore, setRepoScore] = useState(-1);
  // const [issueScore, setIssueScore] = useState(-1);

  // useEffect(() => {
  //   if (bioScore > -1 && repoScore > -1) {
  //     console.log(bioScore, repoScore);
  //     setUserScore(((bioScore + repoScore) / 2) * 100);
  //     setInitialLoad(false);
  //   }
  // }, [bioScore, repoScore]);

  const [selectedHeader, setSelectedHeader] = useState("Bio");

  const [result] = useQuery({
    query: `
    query {
      user(login: "${username}") {
        login
      }
    }
  `,
  });
  const { data, fetching, error } = result;

  if (error) return null;

  return (
    <>
      {data && !error && !fetching && (
        <div
          key={username}
          className="w-80 max-w-md p-2 m-2 rounded-lg bg-white shadow-xl border-2 border-gray-200"
        >
          <UserHeader
            idx={idx}
            username={username}
            usernames={usernames}
            setUsernames={setUsernames}
            // userScore={userScore}
          />

          <div className="flex flex-row justify-around">
            <button
              className={`${
                selectedHeader === "Bio" ? "bg-slate-600 text-white" : "bg-slate-200"
              } w-full`}
              onClick={() => setSelectedHeader("Bio")}
            >
              Social
            </button>
            <button
              className={`${
                selectedHeader === "Repos" ? "bg-slate-600 text-white" : "bg-slate-200"
              } w-full`}
              onClick={() => setSelectedHeader("Repos")}
            >
              Pinned Repos
            </button>
            {/* <button
          className={`${
            selectedHeader === "Issues" ? "bg-blue-400" : "bg-blue-200"
          } w-full`}
          onClick={() => setSelectedHeader("Issues")}
        >
          Issues
        </button> */}
          </div>

          {selectedHeader === "Bio" && (
            <Bio
              username={username}
              setUsernames={setUsernames}
              // bioScore={bioScore}
              // setBioScore={setBioScore}
            />
          )}
          {selectedHeader === "Repos" && (
            <PinnedRepos
              username={username}
              // repoScore={repoScore}
              // setRepoScore={setRepoScore}
            />
          )}
          {/* {(selectedHeader === "Issues") && (
        <Issues
          username={username}
          issueScore={issueScore}
          setIssueScore={setIssueScore}
        />
      )} */}
        </div>
      )}
    </>
  );
}
