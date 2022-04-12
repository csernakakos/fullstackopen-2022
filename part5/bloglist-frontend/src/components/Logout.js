export default function Logout() {
    return (
        <button
            onClick={() => {
                window.localStorage.clear();
                window.location.reload(false);
            }}
        >Log out</button>
    )
}