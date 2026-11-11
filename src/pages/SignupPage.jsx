import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../services/authService";
import toast from "react-hot-toast";
import AuthStory from "../components/design/AuthStory";
import DesignIcon from "../components/design/DesignIcon";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });
  const [ submitting, setSubmitting ] = useState(false)

  const { username, password, passwordConf } = formData;

  function handleChange(event){
    setError("");
    setFormData({ ...formData, [event.target.name]: event.target.value });

  }


  async function handleSubmit(event){
    event.preventDefault();
    try {
      setSubmitting(true)
      await signUp(formData);
      toast.success("Account created successfully! Please sign in.");
      navigate('/sign-in')
    } catch (err) {
      setError(err.response.data.message);
      setSubmitting(false)
    }
  }

  function isFormInvalid(){
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="threadly-page auth-page auth-signup">
      <AuthStory mode="signup" />

      <section className="auth-panel" aria-labelledby="auth-title">
        <p className="auth-kicker">YOUR NEXT CHAPTER</p>
        <h1 id="auth-title">Make yourself at home.</h1>
        <p className="auth-subtitle">
          Find your communities, share what you love, and join the conversation.
        </p>

        <nav className="auth-switch" aria-label="Account pages">
          <Link to="/sign-in">Sign in</Link>
          <Link to="/sign-up" aria-current="page">Sign up</Link>
        </nav>

        <p className="error" role="alert">{error}</p>

        <form className="threadly-form auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="username">Username</label>
            <div className="auth-input">
              <DesignIcon name="user" size={18} />
              <input
                type="text"
                id="username"
                value={username}
                name="username"
                onChange={handleChange}
                autoComplete="username"
                placeholder="Choose your username"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <div className="auth-input">
              <DesignIcon name="lock" size={18} />
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="confirm">Confirm password</label>
            <div className="auth-input">
              <DesignIcon name="lock" size={18} />
              <input
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Enter your password again"
                required
              />
            </div>
          </div>

          <div className="auth-actions">
            <button
              type="submit"
              className="auth-submit"
              disabled={isFormInvalid() || submitting}
            >
              <span>{submitting ? 'Signing up...' : 'Create account'}</span>
              <DesignIcon name="arrow" size={18} />
            </button>
            <button
              type="button"
              className="auth-back"
              onClick={() => navigate("/")}
            >
              Back to exploring
            </button>
          </div>
        </form>

        <p className="auth-crosslink">
          Already part of the conversation? <Link to="/sign-in">Sign in</Link>
        </p>
        <div className="auth-smallprint">
          Real people. Real conversations. Your place.
        </div>
      </section>
    </main>
  );
}
export default Signup;
