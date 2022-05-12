export default function Form({ setUsername }) {
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                setUsername(e.target.elements.username.value);
            }}>
                <label htmlFor="username">Enter a GitHub username: </label>
                <input type="text" name="username" placeholder="Username" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}