import { useState, useEffect } from "react";
import {
  InformationCircleIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Auth from "./Auth.js";
import Notification from "./Notification.js";
import { useAuth } from "../contexts/AuthProvider.js";

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
  const [showingAuthModal, setShowingAuthModal] = useState(true);
  const [showingInfo, setShowingInfo] = useState(false);
  const [showingForm, setShowingForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setShowingForm(user && usernames.length < 8 && usernames.length >= 0)
  }, [user, usernames]);

  // useEffect(() => {
  //   if (usernames.length >= 8) setShowingForm(false);
  //   else setShowingForm(true);
  // }, [usernames]);

  const addUserToList = (username) => {
    if (usernames.includes(username)) {
      setUserAlreadyAdded(true);
    } else {
      setUserAdded(true);
      if (!usernames.includes(username)) setUsernames((usernames) => [...usernames, username]);
      setTimeout(() => setUserAdded(false), 2000);
    }
  };

  const removeUserFromList = (idx) => {
    const temp = [...usernames];
    temp.splice(idx, 1);
    setUsernames(temp);
  };

  return (
    <>
      <div className="w-full fixed top-0 p-0 sm:p-4 bg-slate-50 drop-shadow-lg flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <h3 className="font-bold text-2xl my-2 sm:my-0">Dev-Compare</h3>
          <button
            className="flex bg-justify-center bg-slate-50 rounded-md items-center"
            onClick={() => {
              setShowingInfo(!showingInfo);
            }}
          >
            <InformationCircleIcon className="pl-2 h-7 w-7 text-slate-400" />
          </button>
        </div>
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
                    if (data.message === "Not Found") setUserNotFound(true);
                    else addUserToList(e.target.elements.username.value);
                  })
                  .catch((err) => {
                    console.log(err);
                    setError(true);
                    setTimeout(() => {
                      setError(false);
                    }, 2000);
                  })
                  .finally(() => {
                    setTimeout(() => {
                      setUserNotFound(false);
                      setUserAlreadyAdded(false);
                      setUserAdded(false);
                    }, 2000);
                    e.target.elements.username.value = "";
                  });
              }}
            >
              <input
                className="w-48 h-8 sm:w-64 mx-2 p-1 rounded-md border-2"
                type="text"
                name="username"
                required
                placeholder="GitHub Username"
              />
              <button
                className="flex justify-center border-2 w-8 h-8 p-1 my-2 bg-slate-200 rounded-md items-center"
                type="submit"
              >
                <PlusIcon className="w-8 text-slate-800 hover:text-slate-400" />
              </button>
            </form>
          )}
          {!showingForm && user && (
            <p className="italic mr-2">
              Please remove a user before adding another one.
            </p>
          )}
          {!showingForm && !user && (
            <p className="italic mr-2">
              Please sign into GitHub.
            </p>
          )}
          <button
            className="flex justify-center border-2 w-8 h-8 p-1 my-2 bg-slate-200 rounded-md items-center"
            onClick={() => setShowingAuthModal(!showingAuthModal)}
          >
            <UserCircleIcon className="w-8 text-slate-800 hover:text-slate-300" />
          </button>
          {showingAuthModal && (
            <Auth
              usernames={usernames}
              addUserToList={addUserToList}
              removeUserFromList={removeUserFromList}
              setShowingAuthModal={setShowingAuthModal}
            />
          )}
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
