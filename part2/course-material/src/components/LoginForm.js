import PropTypes from "prop-types";
export default function LoginForm({
    handleLogin,
    setUsername,
    username,
    setPassword,
    password,
}) {
    return (
        <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            name="Username"
            type="text"
            id="usernameINPUT"
          />
  
        </div>
  
        <div>
          password
          <input
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            name="Password"
            type="password"
            id="passwordINPUT"
          />
  
        </div>
  
        <button 
        id="loginBUTTON"
        type="submit">Log in</button>
  
      </form>
      )
}


LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }