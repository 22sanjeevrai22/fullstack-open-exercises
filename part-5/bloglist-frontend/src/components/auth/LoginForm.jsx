import PropTypes from 'prop-types'
import { useState } from 'react'
import { login } from '../../services/authService'
import { setToken } from '../../services/blogService'
import { extractErrorMessage } from '../../utils/errorUtils'

const LoginForm = ({
  setUserWrapper,
  setErrorMessageWrapper,
  setSuccessMessageWrapper,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({ username, password })
      console.log('userrr in login form', user)
      window.localStorage.setItem('blogUserInfo', JSON.stringify(user))
      setToken(user.token)
      setUserWrapper(user)
      setUsername('')
      setPassword('')

      setSuccessMessageWrapper('Login Successful by', user.username)
      setTimeout(() => {
        setSuccessMessageWrapper(null)
      }, 5000)
    } catch (error) {
      const errorMessage = extractErrorMessage(error, 'Failed to log in')
      setErrorMessageWrapper(errorMessage)
      setTimeout(() => {
        setErrorMessageWrapper(null)
      }, 5000)
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            placeholder="Username hmm.."
            value={username}
            type="text"
            name="username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Password hmm.."
            value={password}
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  setUserWrapper: PropTypes.func.isRequired,
  setErrorMessageWrapper: PropTypes.func.isRequired,
  setSuccessMessageWrapper: PropTypes.func.isRequired,
}

export default LoginForm
