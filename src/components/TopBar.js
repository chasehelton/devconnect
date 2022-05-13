import { useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Notification from "./Notification.js";

export default function TopBar({
  usernames,
  setUsernames,
  maxUsersReached,
  userAlreadyAdded,
  setUserAlreadyAdded,
}) {
  const [userAdded, setUserAdded] = useState(false);
  const [error, setError] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const [showingInfo, setShowingInfo] = useState(false);
  const [showingForm, setShowingForm] = useState(
    usernames.length < 8 && usernames.length >= 0
  );

  useEffect(() => {
    if (usernames.length >= 8) setShowingForm(false);
    else setShowingForm(true);
  }, [usernames]);

  return (
    <>
      <div className="w-full fixed top-0 p-0 sm:p-4 bg-slate-50 drop-shadow-lg flex flex-col sm:flex-row justify-between items-center">
        <h3 className="font-bold text-2xl my-2 sm:my-0">Dev-Compare</h3>
        <div className="flex flex-row mx-2 items-center">
          {showingForm && (
            <form
              className="flex flex-row mx-2 items-center"
              onSubmit={(e) => {
                e.preventDefault();
                setShowingInfo(false);
                fetch(`https://api.github.com/users/${e.target.username.value}`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.message === "Not Found") {
                      setUserNotFound(true);
                    } else if (usernames.includes(e.target.username.value)) {
                      setUserAlreadyAdded(true);
                    } else {
                      setUserAdded(true);
                      setUsernames((usernames) => [
                        ...usernames,
                        e.target.elements.username.value,
                      ]);
                    }
                    // Reset errors
                    setTimeout(() => {
                      setUserNotFound(false);
                      setUserAlreadyAdded(false);
                      setUserAdded(false);
                    }, 2000);
                    e.target.elements.username.value = "";
                  })
                  .catch((err) => {
                    console.log(err);
                    setError(true);
                    setTimeout(() => {
                      setError(false);
                    }, 2000);
                  });
              }}
            >
              <input
                className="w-48 h-8 sm:w-64 mx-1 p-1 rounded-md border-2"
                type="text"
                name="username"
                placeholder="GitHub Username"
              />
              <button
                className="flex justify-center border-2 w-24 h-8 p-1 my-2 sm:w-24 sm:my-0 bg-slate-200 rounded-md items-center"
                type="submit"
              >
                Add to List
              </button>
            </form>
          )}
          {!showingForm && (
            <p className="italic mr-2">
              Please remove a user before adding another one.
            </p>
          )}
          <button
            className="flex bg-justify-center bg-slate-50 rounded-md items-center"
            onClick={() => {
              setShowingInfo(!showingInfo);
            }}
          >
            <InformationCircleIcon className="h-7 w-7 text-slate-400" />
          </button>
        </div>
      </div>
      {error && (
        <Notification color={"red"} message={"Error fetching user data"} />
      )}
      {userNotFound && (
        <Notification color={"red"} message={"User not found."} />
      )}
      {userAlreadyAdded && (
        <Notification color={"red"} message={"User already added to list."} />
      )}
      {maxUsersReached && (
        <Notification
          color={"red"}
          message={"You can only compare 8 users at a time."}
        />
      )}
      {userAdded && (
        <Notification color={"green"} message={"User added to list."} />
      )}
      {showingInfo && (
        <div>
          <div className="fixed w-full top-24 sm:top-16 bg-white drop-shadow-lg text-center">
            <p className="text-center font-bold mx-auto mt-4">
              What is Dev-Compare?
            </p>
            <p className="text-center w-5/6 mx-auto mb-2">
              Dev-Compare is a tool to compare and connect GitHub users.
            </p>
            <p className="text-center font-bold mx-auto mt-2">
              How to use Dev-Compare?
            </p>
            <p className="text-center w-5/6 mx-auto">
              Search any GitHub user by their login name and add them to the
              list to compare them. A user's "connections" are a shortened list
              of their followers and following combined. The design choice
              behind this was to find other developers that are closely
              connected to you in some way, similar to LinkedIn, to allow for
              easier networking and collaboration. For any user that has an
              email connected to their account, they will have an email button
              included in the top-right corner to reach out.
            </p>
            <button
              className="text-red-500 m-4"
              onClick={() => setShowingInfo(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
