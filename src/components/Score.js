export default function Score({ score }) {
  let roundedScore = Math.round(score);
  if (roundedScore >= 100) {
    roundedScore = 100;
  }
  return (
    <div>
      {roundedScore <= 100 && roundedScore >= 90 && (
        <p className="font-bold text-green-700">{roundedScore}%</p>
      )}
      {roundedScore < 90 && roundedScore >= 75 && (
        <p className="font-bold text-green-300">{roundedScore}%</p>
      )}
      {roundedScore < 75 && roundedScore >= 50 && (
        <p className="font-bold text-yellow-300">{roundedScore}%</p>
      )}
      {roundedScore < 50 && roundedScore >= 25 && (
        <p className="font-bold text-orange-500">{roundedScore}%</p>
      )}
      {roundedScore < 25 && roundedScore >= 0 && (
        <p className="font-bold text-red-500">{roundedScore}%</p>
      )}
    </div>
  );
}
