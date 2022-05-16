import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  // ChatIcon,
  InformationCircleIcon,
  PlusIcon,
  UserCircleIcon,
  StarIcon,
} from "@heroicons/react/solid";
import Auth from "./Auth.js";
import Favorites from "./Favorites.js";
import Notifications from "./Notifications.js";
import { useAuth } from "../contexts/AuthProvider.js";

export default function TopBar({
  page,
  usernames,
  setUsernames,
  maxUsersReached,
  userAlreadyAdded,
  setUserAlreadyAdded,
}) {
  const [userAdded, setUserAdded] = useState(false);
  const [error, setError] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [showingAuthModal, setShowingAuthModal] = useState(false);
  const [showingFavoritesModal, setShowingFavoritesModal] = useState(false);
  const [showingInfo, setShowingInfo] = useState(false);
  const [showingForm, setShowingForm] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowingForm(user && usernames.length < 8 && usernames.length >= 0);
  }, [user, usernames]);

  const handleAddUserViaForm = async (e) => {
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
  };

  const addUserToList = (username) => {
    if (usernames.includes(username)) {
      setUserAlreadyAdded(true);
    } else {
      setUserAdded(true);
      if (!usernames.includes(username))
        setUsernames((usernames) => [...usernames, username]);
      setTimeout(() => setUserAdded(false), 2000);
    }
    setTimeout(() => setUserAlreadyAdded(false), 2000);
  };

  const removeUserFromList = (idx) => {
    const temp = [...usernames];
    temp.splice(idx, 1);
    setUsernames(temp);
  };

  return (
    <div>
      <div className="w-full fixed top-0 p-0 sm:p-4 bg-slate-50 drop-shadow-lg flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <button
            className="flex items-center focus:outline-none"
            onClick={() => navigate("/")}
          >
            <h3 className="font-bold text-2xl my-2 sm:my-0">devconnect</h3>
          </button>
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
          {showingForm && page === "UserList" && (
            <form
              className="flex flex-row items-center"
              onSubmit={(e) => handleAddUserViaForm(e)}
            >
              <input
                className="w-48 h-8 sm:w-64 mx-2 p-1 rounded-md border-2"
                type="text"
                name="username"
                required
                placeholder="GitHub Username"
              />
              <button
                className="flex justify-center border-2 w-8 h-8 p-1 m-1 bg-slate-200 rounded-md items-center"
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
            <p className="italic mr-2">Please sign into GitHub.</p>
          )}
          {location.pathname.includes("messages") && (
            <button
              className="flex justify-center border-2 w-8 h-8 p-1 m-1 bg-slate-200 rounded-md items-center"
              onClick={() => {
                setShowingAuthModal(false);
                setShowingFavoritesModal(false);
                navigate("/");
              }}
            >
              <HomeIcon className="w-8 text-slate-800 hover:text-slate-300" />
            </button>
          )}
          {showingForm && user && !location.pathname.includes("messages") && (
            <button
              className="flex justify-center border-2 w-8 h-8 p-1 m-1 bg-slate-200 rounded-md items-center"
              onClick={() => {
                setShowingAuthModal(false);
                setShowingFavoritesModal(!showingFavoritesModal);
              }}
            >
              <StarIcon className="w-8 text-slate-800 hover:text-slate-300" />
            </button>
          )}
          {/* {showingForm && user && (
            <button
              className="flex justify-center border-2 w-8 h-8 p-1 m-1 bg-slate-200 rounded-md items-center"
              onClick={() => {
                setShowingAuthModal(false);
                setShowingFavoritesModal(false);
                navigate(
                  `/${user.identities[0].identity_data.user_name}/messages`
                );
              }}
            >
              <ChatIcon className="w-8 text-slate-800 hover:text-slate-300" />
            </button>
          )} */}

          <button
            className="flex justify-center border-2 w-8 h-8 p-1 m-1 bg-slate-200 rounded-md items-center"
            onClick={() => {
              setShowingFavoritesModal(false);
              setShowingAuthModal(!showingAuthModal);
            }}
          >
            <UserCircleIcon className="w-8 text-slate-800 hover:text-slate-300" />
          </button>

          {showingFavoritesModal && <Favorites addUserToList={addUserToList} />}

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
      <Notifications
        error={error}
        userNotFound={userNotFound}
        userAlreadyAdded={userAlreadyAdded}
        maxUsersReached={maxUsersReached}
        userAdded={userAdded}
      />
      {showingInfo && (
        <div className="fixed w-full top-24 sm:top-16 bg-white drop-shadow-lg text-center">
          <p className="text-center font-bold mx-auto mt-4">
            What is devconnect?
          </p>
          <p className="text-center w-5/6 mx-auto mb-2">
            Devconnect is an app made to connect GitHub users.
          </p>
          <p className="text-center font-bold mx-auto mt-2">
            How to use devconnect?
          </p>
          <p className="text-center w-5/6 mx-auto">
            Search any GitHub user by their login name and add them to the list
            to compare them. A user's "connections" are a shortened list of
            their followers and following combined. The design choice behind
            this was to find other developers that are closely connected to you
            in some way, similar to LinkedIn, to allow for easier networking and
            collaboration. For any user that has an email connected to their
            account, they will have an email button included in the top-right
            corner to reach out.
          </p>
          <button
            className="text-red-500 m-4"
            onClick={() => setShowingInfo(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
