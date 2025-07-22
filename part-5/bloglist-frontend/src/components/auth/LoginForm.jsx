import { useState } from "react";
import { login } from "../../services/authService";

const LoginForm = ({ handleSetUser, setErrorMessageWrapper }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      console.log("userrr in login form", user);
      window.localStorage.setItem("blogUserInfo", JSON.stringify(user));
      handleSetUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessageWrapper("Wrong credentials");
      setTimeout(() => {
        setErrorMessageWrapper(null);
      }, 5000);
    }
  };
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
  );
};

export default LoginForm;
