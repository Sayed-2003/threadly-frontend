// src/components/SignInForm/SignInForm.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { signIn } from '../services/authService';
import toast from 'react-hot-toast';
import AuthStory from '../components/design/AuthStory';
import DesignIcon from '../components/design/DesignIcon';


const SignInForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  function handleChange(event){
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      toast.success('Signed in successfully!');
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to sign in. Please try again.');
    }
  };

  return (
    <main className="threadly-page auth-page auth-signin">
      <AuthStory mode="signin" />

      <section className="auth-panel" aria-labelledby="auth-title">
        <p className="auth-kicker">WELCOME BACK</p>
        <h1 id="auth-title">Good to see you again.</h1>
        <p className="auth-subtitle">
          Your communities, conversations, and saved posts are waiting.
        </p>

        <nav className="auth-switch" aria-label="Account pages">
          <Link to="/sign-in" aria-current="page">Sign in</Link>
          <Link to="/sign-up">Sign up</Link>
        </nav>

        <p className="error" role="alert">{error}</p>

        <form className="threadly-form auth-form" autoComplete="on" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="username">Username</label>
            <div className="auth-input">
              <DesignIcon name="user" size={18} />
              <input
                type="text"
                autoComplete="username"
                id="username"
                value={formData.username}
                name="username"
                onChange={handleChange}
                placeholder="Your username"
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
                autoComplete="current-password"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                placeholder="Your password"
                required
              />
            </div>
          </div>

          <div className="auth-actions">
            <button type="submit" className="auth-submit">
              <span>Sign in</span>
              <DesignIcon name="arrow" size={18} />
            </button>
            <button
              type="button"
              className="auth-back"
              onClick={() => navigate('/')}
            >
              Back to exploring
            </button>
          </div>
        </form>

        <p className="auth-crosslink">
          New around here? <Link to="/sign-up">Create an account</Link>
        </p>
        <div className="auth-smallprint">
          Real people. Real conversations. Your place.
        </div>
      </section>
    </main>
  );
};

export default SignInForm;
