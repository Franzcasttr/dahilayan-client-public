import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { API } from '../client/config';

import { useAppDispatch } from '../features/app/hook';
import { signupUser } from '../features/user/userSlice';
import { initFirebase } from '../firebase/firebaseApp';

const LoginForm = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [switchAuth, setSwitchAuth] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { push, query } = useRouter();
  const callback = query.callbackUrl;

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userdata) => {
        const { uid } = userdata.user;
        const payload = {
          name,
          email,
          password,
          uid,
        };
        dispatch(signupUser(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className='section-center'>
      <div className='p-4 md:p-8 border-2 border-gray-300 rounded-3xl w-fit mx-auto '>
        {switchAuth ? (
          <p className='font-semibold text-center mb-3 text-xl'>Sign up</p>
        ) : (
          <p className='font-semibold text-center mb-3 text-xl'>Login</p>
        )}
        <form className='flex flex-col gap-4 form-login'>
          {switchAuth && (
            <>
              <label htmlFor='email'>Name</label>
              <input
                type='text'
                name='name'
                id='email'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className='grid place-content-center mt-4'>
          {switchAuth ? (
            <button
              className='p-2 mx-auto text-lg rounded-lg bg-[#65CFA9] text-white w-28 cursor-pointer'
              onClick={handleSignup}>
              Sign up
            </button>
          ) : (
            <button
              className='p-2 mx-auto text-lg rounded-lg bg-[#65CFA9] text-white w-28 cursor-pointer'
              onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
        <p className='font-semibold text-center my-3 text-xl'>or</p>
        <div className='flex justify-center'>
          <button
            className='flex gap-4 items-center cursor-pointer p-4 border border-gray-400 rounded-md'
            onClick={async () => {
              await signInWithPopup(auth, provider);
              auth.currentUser?.getIdToken(true).then(async (token) => {
                if (token) {
                  API.post('users/saveuser', { token: token });
                }
              });
            }}>
            <FcGoogle className='text-4xl' />
            <p>Continue with Google</p>
          </button>
        </div>
        <div className='text-center'>
          {switchAuth ? (
            <p className='text-sm mt-4'>
              Already have an account?{' '}
              <button
                className='text-blue-400 font-semibold cursor-pointer'
                onClick={() => setSwitchAuth(false)}>
                Login
              </button>
            </p>
          ) : (
            <p className='text-sm mt-4'>
              Don&apos;t you have an account?{' '}
              <button
                className='text-blue-400 font-semibold cursor-pointer'
                onClick={() => setSwitchAuth(true)}>
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
