import Languages from "./Languages.js";
import PinnedRepos from "./PinnedRepos.js";

export default function Code({username}) {
    return (
        <div>
            <Languages username={username} />
            <PinnedRepos username={username} />
        </div>
    );
}