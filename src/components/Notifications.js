function Notification({ color, message }) {
  return (
    <div
      className={`fixed w-full top-24 sm:top-16 bg-slate-100 p-2 drop-shadow-lg text-center`}
    >
      <p className={`font-bold text-${color}-500 text-center`}>{message}</p>
    </div>
  );
}

export default function Notifications({error, userNotFound, userAlreadyAdded, maxUsersReached, userAdded}) {
  return (
    <div>
      {error && (
        <Notification color={"red"} message={"Error fetching user data"} />
      )}
      {userNotFound && (
        <Notification color={"red"} message={"User not found."} />
      )}
      {userAlreadyAdded && (
        <Notification color={"red"} message={"User already added to list."} />
      )}
      {maxUsersReached && (
        <Notification
          color={"red"}
          message={"You can only compare 8 users at a time."}
        />
      )}
      {userAdded && (
        <Notification color={"green"} message={"User added to list."} />
      )}
    </div>
  );
}