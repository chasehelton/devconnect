import { useState, useEffect } from "react";

import { supabase } from "../supabase.js";
import { useAuth } from "../contexts/AuthProvider.js";

export default function Favorites({ usernames, addUserToList }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed right-1 top-24 sm:top-16">
      <div className="bg-slate-100 shadow-lg rounded-md p-2">
        <div className="flex flex-col justify-start w-64 h-64 overflow-scroll">
          {/* {favorites.length > 0 && ( */}
          <div className="fixed flex flex-row justify-start items-center px-2 py-1 bg-slate-100 border-b-2">
            <p className="font-bold mr-3">Favorites</p>
            <input
              className="w-40 rounded-md px-1"
              placeholder="Filter by username"
              type="text"
              onChange={(event) => setFilter(event.target.value)}
              value={filter}
            ></input>
          </div>
          {/* )} */}
          {favorites.length > 0 && (
            <div className="mt-8">
              <ul>
                {favorites.filter(f => f.includes(filter) || filter === '').map((favorite) => (
                  <li key={favorite} className="pl-2">
                    <button
                      onClick={() => {
                        addUserToList(favorite);
                      }}
                      className={
                        usernames.includes(favorite)
                          ? `font-bold text-blue-600 hover:text-blue-300`
                          : `text-blue-500 hover:text-blue-300`
                      }
                    >
                      {favorite}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {favorites.length === 0 && (
            <p className="pl-2 mt-8 text-slate-800">
              {loading ? "Loading..." : "No favorites"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
