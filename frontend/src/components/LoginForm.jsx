import "../login.css";
const LoginForm = () => {
  return (
    <div className="container-login">
  <div>
    <h1>Login</h1>
    <form>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" className="login-email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" className="login-password" />
      </div>
      <button type="login-submit">Login</button>
    </form>
  </div>
</div>

  );
};

export default LoginForm;
