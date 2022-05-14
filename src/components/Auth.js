import { useState, useEffect } from "react";
// import { supabase } from "../supabase.js";
import { useAuth } from "../contexts/AuthProvider.js";
import octocat from "../octocat.png";

export default function Auth({
  usernames,
  addUserToList,
  removeUserFromList,
  setShowingAuthModal,
}) {
  const [loading, setLoading] = useState(false);

  const { user, signOut, signInWithGitHub } = useAuth();

  useEffect(() => {
      console.log(user);
  }, [user]);

  const handleGitHubLogin = async () => {
    try {
      setShowingAuthModal(false);
      setLoading(true);
      const { error } = await signInWithGitHub();
      if (error) throw error;
      console.log(user);
      if (user) {
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setShowingAuthModal(false);
      setLoading(true);
      await signOut();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 mt-16">
      <div className="bg-white shadow-lg rounded-lg px-4 py-3">
        <div className="flex justify-center text-center w-64">
          {!user && (
            <button
              className="mr-2 px-10 h-8 bg-gray-600 text-gray-300 rounded-md focus:border-4 border-blue-300 flex flex-row items-center justify-between"
              onClick={() => handleGitHubLogin()}
              disabled={loading}
            >
              <img src={octocat} alt="octocat" height="20" width="20" />
              <p className="ml-2">{loading ? "Logging in" : "Login"}</p>
            </button>
          )}
          {user && user.identities && (
            <div className="flex flex-col justify-center items-center p-2">
                <div className="flex flex-row my-2">
                    <img
                        src={user.identities[0].identity_data.avatar_url}
                        alt="profile_picture"
                        width="50"
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                        <p className="font-bold ">{user.identities[0].identity_data.user_name}</p>
                        <p>{user.identities[0].identity_data.name}</p>
                    </div>
                </div>
              <button
                className="mr-2 px-10 h-8 bg-gray-600 text-gray-300 rounded-md focus:border-4 border-blue-300 flex flex-row items-center justify-between"
                onClick={() => handleSignOut()}
                disabled={loading}
              >
                <p>{loading ? "Logging out" : "Log out"}</p>
              </button>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
