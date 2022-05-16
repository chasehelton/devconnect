import { useState, useEffect } from "react";
import { createClient, Provider } from "urql";
import TopBar from "../components/TopBar.js";
import UserList from "../components/UserList.js";
import UserPage from "../pages/UserPage.js";
import Messages from "../pages/Messages.js";
import Favorites from "../pages/Favorites.js";

const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` },
  },
});

export default function Home({ page }) {
  const [usernames, setUsernames] = useState([]);
  const [maxUsersReached, setMaxUsersReached] = useState(false);
  const [userAlreadyAdded, setUserAlreadyAdded] = useState(false);

  return (
    <Provider value={client}>
      <TopBar
        page={page}
        usernames={usernames}
        setUsernames={setUsernames}
        maxUsersReached={maxUsersReached}
        userAlreadyAdded={userAlreadyAdded}
        setUserAlreadyAdded={setUserAlreadyAdded}
      />
      <div className="flex flex-row flex-wrap justify-center max-w-7xl mx-auto mt-28 sm:mt-20">
        {page === "UserList" && <UserList
          usernames={usernames}
          setUsernames={setUsernames}
          setMaxUsersReached={setMaxUsersReached}
          setUserAlreadyAdded={setUserAlreadyAdded}
        />}
        {page === "UserPage" && <UserPage />}
        {page === "Messages" && <Messages />}
        {page === "Favorites" && <Favorites />}
      </div>
      
    </Provider>
  );
}
