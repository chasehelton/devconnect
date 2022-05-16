import { useState, useEffect } from "react";
import { UserAddIcon, UserRemoveIcon } from "@heroicons/react/solid";
import { useQuery, useMutation } from "urql";
import { GET_USER_ID, IS_FOLLOWING_USER } from "../graphql/queries.js";
import { FOLLOW_USER, UNFOLLOW_USER } from "../graphql/mutations";

export default function FollowerIcon({ user, username }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const [resultFollow] = useQuery({
    query: IS_FOLLOWING_USER,
    variables: { username: username },
  });
  const {
    data: followData,
    fetching: followFetching,
    error: followError,
  } = resultFollow;
  if (followError) alert(followError);

  const [resultId] = useQuery({
    query: GET_USER_ID,
    variables: { username: user.user_metadata.user_name },
  });
  const { data: idData, error: idError } = resultId;
  if (idError) alert(idError);

  const [followUserResult, followUser] = useMutation(FOLLOW_USER);
  const [unfollowUserResult, unfollowUser] = useMutation(UNFOLLOW_USER);

  const handleFollowUser = async () => {
    setIsFollowing(!isFollowing);
    const variables = {
      clientMutationId: idData.user.id,
      userId: followData.user.id,
    };
    console.log(followUserResult);
    followUser(variables);
  };

  const handleUnfollowUser = async () => {
    setIsFollowing(!isFollowing);
    const variables = {
      clientMutationId: idData.user.id,
      userId: followData.user.id,
    };
    console.log(unfollowUserResult);
    unfollowUser(variables);
  };

  useEffect(() => {
    if (followData) setIsFollowing(followData.user.following);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followData]);

  return (
    <div>
      {!followFetching &&
        user &&
        user.user_metadata.user_name !== username &&
        isFollowing && (
          <button onClick={() => handleUnfollowUser()}>
            <UserRemoveIcon className="w-6 h-6 mt-2 text-slate-800 hover:text-slate-300" />
          </button>
        )}
      {!followFetching &&
        user &&
        user.user_metadata.user_name !== username &&
        !isFollowing && (
          <button onClick={() => handleFollowUser()}>
            <UserAddIcon className="w-6 h-6 mt-2 text-slate-800 hover:text-slate-300" />
          </button>
        )}
    </div>
  );
}
