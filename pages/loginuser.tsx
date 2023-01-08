import React, { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initFirebase } from '../firebase/firebaseApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { API } from '../client/config';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../features/app/hook';
import { signupUser } from '../features/user/userSlice';

const Authenticate = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { push, query } = useRouter();
  const { loading: userStateLoading } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [switchAuth, setSwitchAuth] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');
  const [user, loading] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const callback = query.callbackUrl;

  // const getToken = async () => {

  //   const token = await auth.currentUser?.getIdToken(true);
  //   const result = await API.post('users/createuserfromgoogle', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   return result;
  // };

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          if (callback) {
            setTimeout(() => {
              push(`${callback}`);
            }, 2000);
          } else {
            setTimeout(() => {
              push('/');
            }, 2000);
          }
        }
      })
      .catch((error) => {
        setIsError(error.message);
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

  if (loading || userStateLoading) {
    return (
      <div className='section-center'>
        <div className='text-center mt-32'>
          <h1 className='text-xl font-semibold'>Checking Authentication...</h1>
        </div>
      </div>
    );
  }

  if (user) {
    if (callback) {
      setTimeout(() => {
        push(`${callback}`);
      }, 2000);
    } else {
      setTimeout(() => {
        push('/');
      }, 2000);
    }
    return (
      <div className='section-center'>
        <div className='text-center mt-32'>
          <h1 className='text-xl font-semibold'>Checking Authentication...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='section-center'>
        <div className='p-8 border-2 border-gray-300 rounded-3xl sm:w-fit mx-auto mt-20'>
          {switchAuth ? (
            <p className='font-semibold text-center mb-3 text-xl'>Sign up</p>
          ) : (
            <p className='font-semibold text-center mb-3 text-xl'>Login</p>
          )}
          {isError ? (
            <p className='mb-8 p-4 bg-[#fe8c8c] text-red-800 text-lg rounded-lg'>
              {isError}
            </p>
          ) : null}
          <form className='flex flex-col gap-4'>
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
          </form>
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
    </div>
  );
};

export default Authenticate;
