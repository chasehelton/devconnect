import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { supabase } from "../supabase.js";

export default function FavoriteIcon({ user, username }) {
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
    <div>
      {user && user.identities && isFavorite && (
        <StarIcon
          onClick={() => removeUserFromFavorites()}
          className="w-6 h-6 mt-2 text-yellow-400 hover:text-yellow-200 mx-1"
        />
      )}
      {user && user.identities && !isFavorite && (
        <StarIcon
          onClick={() => addUserToFavorites()}
          className="w-6 h-6 mt-2 text-slate-800 hover:text-slate-300 mx-1"
        />
      )}
    </div>
  );
}
