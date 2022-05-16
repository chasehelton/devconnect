import { useState, useEffect } from "react";
import { useQuery } from "urql";

import { supabase } from "../supabase.js";
import { useAuth } from "../contexts/AuthProvider.js";

document.title = "devconnect | Favorites";
export default function Favorites() {
  const [favorites, setFavorites] = useState(["Loading..."]);
  const { user } = useAuth();

  const getAllFavoritesForUser = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("user, favorites_username")
      .eq("user", `${user.identities[0].identity_data.user_name}`);

    if (error) alert(error);
    if (data) setFavorites(data.map((item) => item.favorites_username));
  };

  useEffect(() => { getAllFavoritesForUser() }, []);

  return (
    <div>
      <ul>
        {favorites.map((favorite) => (
          <li>{favorite}</li>
        ))}

      </ul>
    </div>
  );
}
