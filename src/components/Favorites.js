import { useState, useEffect } from "react";
import { useQuery } from "urql";

import { supabase } from "../supabase.js";
import { useAuth } from "../contexts/AuthProvider.js";

export default function Favorites({ addUserToList }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getAllFavoritesForUser = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("favorites")
      .select("user, favorites_username")
      .eq("user", `${user.identities[0].identity_data.user_name}`);
    if (error) {
      setLoading(false);
      alert(error);
    }
    if (data) {
      setFavorites(data.map((item) => item.favorites_username));
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllFavoritesForUser();
  }, []);

  return (
    <div className="fixed right-0 top-24 sm:top-16">
      <div className="bg-slate-100 shadow-lg rounded-md p-2">
        <div className="flex flex-col justify-center w-48">
          <p className="font-bold">Favorites (click to add)</p>
          {favorites.length > 0 && (
            <ul>
              {favorites.map((favorite) => (
                <li key={favorite} className="pl-2">
                  <button
                    onClick={() => {
                      addUserToList(favorite);
                    }}
                    className="font-bold text-blue-500 hover:text-blue-300"
                  >
                    {favorite}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {favorites.length === 0 && (
            <p className="pl-2 text-slate-800">
              {loading ? "Loading..." : "No favorites"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
