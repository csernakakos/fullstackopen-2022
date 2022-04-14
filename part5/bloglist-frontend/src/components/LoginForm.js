export default function LoginForm({handleLogin, username, password, setUsername, setPassword}) {
    return (
        <div>
        <h2>log in to app</h2>
        <form onSubmit={handleLogin} id="loginFORM">

          <input
            value={username}
            type="text"
            onChange={({target}) => {setUsername(target.value)}}
            id="username"
          />

`         <input
            value={password}
            type="password"
            onChange={({target}) => {setPassword(target.value)}}
            id="password"
          />

          <button type="submit" id="login-button">Log in</button>
        </form>
      </div>
    )
}