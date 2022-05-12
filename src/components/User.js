import { useState, useEffect } from "react";
import UserHeader from "./UserHeader.js";
import Bio from "./Bio.js";
import PinnedRepos from "./PinnedRepos.js";
import Issues from "./Issues.js";

export default function User({ idx, username, usernames, setUsernames }) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedHeader, setSelectedHeader] = useState("Bio");
  const [userScore, setUserScore] = useState(0);
  const [bioScore, setBioScore] = useState(0);
  const [repoScore, setRepoScore] = useState(0);
  const [issueScore, setIssueScore] = useState(0);

  useEffect(() => {
    if (bioScore > 0 && repoScore > 0 && issueScore > 0) {
      setUserScore(((bioScore + repoScore + issueScore) / 3) * 100);
      setInitialLoad(false);
    }
  }, [bioScore, repoScore, issueScore]);

  return (
    <div
      key={username}
      className="w-80 max-w-md p-2 m-2 rounded-lg bg-slate-400"
    >
      <UserHeader
        idx={idx}
        username={username}
        usernames={usernames}
        setUsernames={setUsernames}
        userScore={userScore}
      />

      <div className="flex flex-row justify-around">
        <button
          className={`${
            selectedHeader === "Bio" ? "bg-blue-400" : "bg-blue-200"
          } w-full`}
          onClick={() => setSelectedHeader("Bio")}
        >
          Bio
        </button>
        <button
          className={`${
            selectedHeader === "Repos" ? "bg-blue-400" : "bg-blue-200"
          } w-full`}
          onClick={() => setSelectedHeader("Repos")}
        >
          Repos
        </button>
        <button
          className={`${
            selectedHeader === "Issues" ? "bg-blue-400" : "bg-blue-200"
          } w-full`}
          onClick={() => setSelectedHeader("Issues")}
        >
          Issues
        </button>
      </div>

      {(initialLoad || selectedHeader === "Bio") && (
        <Bio
          username={username}
          bioScore={bioScore}
          setBioScore={setBioScore}
        />
      )}
      {(initialLoad || selectedHeader === "Repos") && (
        <PinnedRepos
          username={username}
          repoScore={repoScore}
          setRepoScore={setRepoScore}
        />
      )}
      {(initialLoad || selectedHeader === "Issues") && (
        <Issues
          username={username}
          issueScore={issueScore}
          setIssueScore={setIssueScore}
        />
      )}
    </div>
  );
}
