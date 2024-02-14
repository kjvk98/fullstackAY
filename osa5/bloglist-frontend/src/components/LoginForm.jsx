import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUserNameChange, handlePasswordChange, username, password }) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
      username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUserNameChange}
          />
        </div>
        <div>
    password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUserNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm