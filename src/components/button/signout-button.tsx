'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

function SignOutButton() {
  const signout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/signin`,
    })
  }

  return <Button onClick={signout}>Sign Out</Button>
}

export default SignOutButton