import Head from 'next/head'
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'
import GratitudeApp from '../components/GratitudeApp'
import {useState} from 'react'
import {Auth} from '@supabase/ui'

import { supabase } from '../utils/supabaseClient'

export default function Home() {
  // gets the logged in user from Auth.UserContextProvider
  // if no user is logged in, user will be null
  // if a user is logged in, user will be an object with user info
  const { user } = Auth.useUser()

  return (
    <div className="bg-gradient-to-t from-green-200 to-blue-200 min-h-screen min-w-screen"> 
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-prose px-4 pt-12">
        {
          // display app if user is loffed in, otherwise show login module
          user ? (
            <div>
              <GratitudeApp user={user}/>
              <button onClick={async () => {
                let { error } = await supabase.auth.signOut()
                if(error) {console.log(error)}
              }}
              className="text-yellow-400">Logout</button>
            </div>
          ) :
            <div>
              <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge"/>
            </div>
        }
      </main>
      <style jsx>{`
        button{
          margin: 1em;
          margin-top: 2em;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}
