export default function Form({ setUsernames }) {
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                setUsernames(usernames => [...usernames, e.target.elements.username.value]);
            }}>
                <label htmlFor="username">Enter a GitHub username: </label>
                <input type="text" name="username" placeholder="Username" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}