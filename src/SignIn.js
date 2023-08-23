import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../src/firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [signInError, setSignInError] = useState('');
  const [user, setUser] = useState(auth.currentUser); // User state for authentication

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setSuccessMessage('Signout successful.');
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    try {
      // Try to sign in
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser); // Set the user state on successful sign-in
      setSuccessMessage('Signin successful!.');
      navigateCheckOut(); // Navigate only on successful sign-in
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setSignInError('Invalid password.');
      } else if (error.code === 'auth/user-not-found') {
        try {
          // If user not found, create a new user account
          await createUserWithEmailAndPassword(auth, email, password);
          setUser(auth.currentUser); // Set the user state on successful account creation
          setSuccessMessage('Account created and signed in successfully!');
          navigateCheckOut(); // Navigate only on successful sign-in
        } catch (createError) {
          console.log(createError.message);
        }
      } else {
        console.log(error.message);
      }
    }

    setTimeout(() => {
      setSuccessMessage('');
      setSignInError('');
    }, 5000);
  };

  const navigateCheckOut = () => {
    navigate('/checkout');
  };

  return (
    <>
      <div className='main-sign'>
        <div className='sign'>
          <h3>{user ? 'Signout' : 'Signin'}</h3>
          {user ? (
            <button className='btn' onClick={signOutUser} type='button'>
              Signout
            </button>
          ) : (
            <form action='' onSubmit={submitForm}>
              <div className='email'>
                <label htmlFor='email'>Email:</label>
                <input
                  type='text'
                  id='email'
                  placeholder='Email'
                  autoComplete='off'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className='error'>{emailError}</p>}
              </div>
              <div className='password'>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  id='password'
                  placeholder='Password'
                  autoComplete='off'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className='error'>{passwordError}</p>}
                {signInError && <p className='error'>{signInError}</p>}
              </div>
              <button className='btn' type='submit'>
                Signin
              </button>
              {successMessage && <p className='success'>{successMessage}</p>}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SignIn;
