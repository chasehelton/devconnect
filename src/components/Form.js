export default function Form({ setUsernames }) {
    return (
        <div className="m-3">
            <form className="flex flex-row" onSubmit={(e) => {
                e.preventDefault();
                setUsernames(usernames => [...usernames, e.target.elements.username.value]);
                e.target.elements.username.value = "";
            }}>
                <input className="border-2 w-64 mr-4 rounded-md" type="text" name="username" placeholder="GitHub Username" />
                <button className="flex justify-center border-2 w-32 bg-slate-200 rounded-md" type="submit">Add to List</button>
            </form>
        </div>
    )
}