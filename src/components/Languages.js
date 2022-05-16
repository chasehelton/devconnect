import { useQuery } from "urql";
import { GET_LANGUAGES } from "../graphql/queries";

export default function Languages({ username }) {
  const variables = { username: username };
  const [result] = useQuery({
    query: GET_LANGUAGES,
    variables,
  });
  const { data, fetching, error } = result;

  if (error) {
    return null;
  }
  if (fetching) return <p>Loading...</p>;

  let languageMap = {};
  let topLanguages = [];

  if (data && data.user && data.user.repositories) {
    data.user.repositories.edges.forEach((repo) => {
      if (repo.node.languages.edges.length > 0) {
        repo.node.languages.edges.forEach((language) => {
          if (language.node.name in languageMap) {
            languageMap[language.node.name] += 1;
          } else {
            languageMap[language.node.name] = 1;
          }
        });
      }
    });
    for (let language in languageMap) {
      topLanguages.push({
        name: language,
        count: languageMap[language],
      });
    }
    topLanguages.sort((a, b) => b.count - a.count);
  }

  return (
    <>
      {data && (
        <div className="my-3">
          <p className="font-bold">Top Languages (by frequency)</p>
          <div className="flex flex-row justify-around">
            <ul>
              {topLanguages.slice(0, 3).map((language, idx) => (
                <li key={language.name}>
                  <p className="">
                    {idx + 1}. {language.name}
                  </p>
                </li>
              ))}
            </ul>
            <ul>
              {topLanguages.slice(3, 6).map((language, idx) => (
                <li key={language.name}>
                  <p className="">
                    {idx + 4}. {language.name}
                  </p>
                </li>
              ))}
            </ul>
            <ul>
              {topLanguages.slice(6, 9).map((language, idx) => (
                <li key={language.name}>
                  <p className="">
                    {idx + 7}. {language.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
