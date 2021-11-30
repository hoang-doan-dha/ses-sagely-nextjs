import type { NextPage } from "next";
import { Fragment, SyntheticEvent, useState } from "react";
import Head from 'next/head';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import useUser from "../lib/useUser";



const Login: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  })

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      mutateUser(await axios.post('api/login', { username, password }));
      // await axios.post('api/login', { username, password })
    } catch (error) {
      console.log("🚀 ~ file: login.tsx ~ line 24 ~ handleSubmit ~ error", error)
    }
    // try {
    //   const token = await authenticate({ username, password });
    //   console.log("🚀 ~ file: login.tsx ~ line 22 ~ handleSubmit ~ token", token)
    // } catch (error) {
    //   console.log("🚀 ~ file: login.tsx ~ line 24 ~ handleSubmit ~ error", error)
      
    // } finally {
    //   setLoading(false);
    // }
  }

  return (
    <Fragment>
      <Head>
        <title>SES Mock - Login</title>
      </Head>
      <Fragment>
        <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 bg-opacity-25">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-600">
                Welcome to Sagely SES Mock
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Email address"
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                    />
                  </div>
                  <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      {loading &&
                        <div className="animate-spin h-5 w-5 mr-3 text-white">
                          <FontAwesomeIcon icon={faSpinner} />
                        </div>
                      }
                      Sign in
                    </button>
                  </div>
                </div>
              </form>

              {/* FOOTER */}
              <div className="mt-6">
                <h3 className="block text-sm font-semibold text-gray-700 mb-2 text-blue-500">
                  Available Features
                </h3>
                <ul className="list-disc">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm text-blue-500">
                    Read all email from Simple Email Service
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm text-blue-500">
                    Run Sagely-CLI directly
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  )
}


export default Login;