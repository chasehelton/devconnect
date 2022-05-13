export default function Notification({ color, message }) {
  return (
    <div
      className={`fixed w-full top-24 sm:top-16 bg-slate-100 p-2 drop-shadow-lg text-center`}
    >
      <p className={`font-bold text-${color}-500 text-center`}>{message}</p>
    </div>
  );
}
