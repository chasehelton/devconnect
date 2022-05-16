import { useState, useEffect } from "react";
import {
  // ChatAltIcon,
  // MailIcon,
  XIcon,
  StarIcon,
  // ArrowUpIcon,
} from "@heroicons/react/solid";
import { supabase } from "../supabase.js";

export default function UserIcons({
  user,
  idx,
  username,
  usernames,
  setUsernames,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const getUserFavorite = async () => {
    const favorites = await retrieveFavorites();
    if (favorites === null) {
      alert("Error retrieving updating favorites");
      return;
    } else {
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].favorites_username === username) {
          setIsFavorite(true);
        }
      }
    }
  };

  const addUserToFavorites = async () => {
    const { error } = await supabase.from("favorites").insert({
      user: user.identities[0].identity_data.user_name,
      favorites_username: username,
    });

    if (error) alert(error);
    else setIsFavorite(true);
  };

  const removeUserFromFavorites = async () => {
    const favorites = await retrieveFavorites();
    if (favorites === null) {
      alert("Error retrieving updating favorites");
      return;
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", favorites[0].id);
      if (error) alert(error);
      else setIsFavorite(false);
    }
  };

  const retrieveFavorites = async () => {
    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("id, user, favorites_username")
      .eq("user", `${user.identities[0].identity_data.user_name}`);

    if (error) return null;
    else return favorites;
  };

  useEffect(() => {
    getUserFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      {/* {data.user.email && (
        <button onClick={() => window.location = "mailto:" + data.user.email}>
          <MailIcon className="w-6 h-6 mt-2 text-slate-800 hover:text-slate-300" />
        </button>
      )} */}
      {user && user.identities && isFavorite && (
        <button onClick={() => removeUserFromFavorites()}>
          <StarIcon className="w-6 h-6 mt-2 text-yellow-400 hover:text-yellow-200 ml-1" />
        </button>
      )}
      {user && user.identities && !isFavorite && (
        <button onClick={() => addUserToFavorites()}>
          <StarIcon className="w-6 h-6 mt-2 text-slate-800 hover:text-slate-300 ml-1" />
        </button>
      )}
      {/* {user && user.identities && (
        <button onClick={() => console.log(username)}>
          <ChatAltIcon className="w-6 h-6 mt-2 text-slate-800 hover:text-slate-300 ml-1" />
        </button>
      )} */}
      <button
        onClick={() => {
          const temp = [...usernames];
          temp.splice(idx, 1);
          setUsernames(temp);
        }}
      >
        <XIcon className="w-6 h-6 mt-2 text-red-800 hover:text-red-300 mx-1" />
      </button>
    </div>
  );
}
