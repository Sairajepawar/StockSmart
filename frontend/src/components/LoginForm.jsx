import "../login.css";
const LoginForm = () => {
  return (
    <div classname="container-login">
  <div>
    <h1>Login</h1>
    <form>
      <div classname="form-group">
        <label htmlfor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" classname="login-email" />
      </div>
      <div classname="form-group">
        <label htmlfor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" classname="login-password" />
      </div>
      <button type="login-submit">Login</button>
    </form>
  </div>
</div>

  );
};

export default LoginForm;
