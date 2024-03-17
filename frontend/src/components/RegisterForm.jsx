import "../login.css";
const RegisterForm = () => {
  return (
    <div classname="container-login">
  <div>
    <h1>Register</h1>
    <form>
      <div classname="form-group">
        <label htmlfor="email">Name</label>
        <input type="text" id="name" placeholder="Enter your name" classname="login-email" />
      </div>
      <div classname="form-group">
        <label htmlfor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" classname="login-email" />
      </div>
      <div classname="form-group">
        <label htmlfor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" classname="login-password" />
      </div>
      <button type="login-submit">Register</button>
    </form>
  </div>
</div>

  );
};

export default RegisterForm;
