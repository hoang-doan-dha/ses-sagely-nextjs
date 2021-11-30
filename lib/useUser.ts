import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { User } from '../pages/api/login';

// const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  // No need to add a fetcher here since we already added it on _app globally
  const { data: user, mutate: mutateUser } = useSWR<User>('/api/user')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    console.log("🚀 ~ file: useUser.ts ~ line 16 ~ useEffect ~ user", user)
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}