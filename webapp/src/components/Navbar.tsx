export default function Navbar() {
    const headers = ["title","publishedDate","isbn","author"]
    return (
        <nav className="w-full">
            <ul className="flex flex-row gap-10 p-2">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/table">Table</a>
                </li>
                <li>
                    <a href="/createbook">Create Book</a>
                </li>
                <li>
                    <a href="/createreview">Create Review</a>
                </li>
                <li>
                    <a href="/signin">Sign In</a>
                </li>
                <li>
                    <a href="/signup">Sign Up</a>
                </li>
                <li>
                    <a href="/profile">Profile</a>
                </li>
            </ul>
        </nav>
    )
}