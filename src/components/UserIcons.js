import {
  // ChatAltIcon,
  XIcon,
} from "@heroicons/react/solid";

import FollowerIcon from "./FollowerIcon.js";
import FavoriteIcon from "./FavoriteIcon.js";

export default function UserIcons({
  user,
  idx,
  username,
  usernames,
  setUsernames,
}) {
  return (
    <div className="flex flex-row">
      <FollowerIcon user={user} username={username} />
      <FavoriteIcon user={user} username={username} />
      <XIcon
        onClick={() => {
          const temp = [...usernames];
          temp.splice(idx, 1);
          setUsernames(temp);
        }}
        className="w-6 h-6 mt-2 text-red-800 hover:text-red-300"
      />
      {/* {user && user.identities && (
        <button onClick={() => console.log(username)}>
          <ChatAltIcon className="w-6 h-6 mt-2 text-slate-800 hover:text-slate-300 ml-1" />
        </button>
      )} */}
    </div>
  );
}
