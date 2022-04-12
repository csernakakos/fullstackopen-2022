export default function LoginForm({handleLogin, username, password, setUsername, setPassword}) {
    return (
        <div>
        <h2>log in to app</h2>
        <form onSubmit={handleLogin}>

          <input
            value={username}
            type="text"
            onChange={({target}) => {setUsername(target.value)}}
          />

`         <input
            value={password}
            type="password"
            onChange={({target}) => {setPassword(target.value)}}
          />

          <button type="submit">Log in</button>
        </form>
      </div>
    )
}