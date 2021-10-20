import Head from 'next/head'
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'
import {useState} from 'react'

import { supabase } from '../utils/supabaseClient'

export default function Home() {
  // [data value, updater function] = useState({default value of variable})
  const [user, setUser] = useState({
    "name": "Jennifer",
    "email": "jenguyen@chapman.edu",
  })

  const [gratitudes, setGratitudes] = useState(['pumpkins','corn mazes','fall'])

  const [hasSubmittedToday, setSubmittedToday] = useState(false)

  const addGratitude = (entry) => {
    let newGratitudes = [...gratitudes,entry]
    setGratitudes(newGratitudes)
    setSubmittedToday(true)
  }

  return (
    <div className="bg-gradient-to-t from-green-200 to-blue-200 min-h-screen min-w-screen"> 
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-prose px-4 pt-12">
          <Greeting 
            user={user}
            gratitudes={gratitudes}
            hasSubmittedToday={hasSubmittedToday}
          ></Greeting>
          <div className="spacer" />
          {
            !hasSubmittedToday && <Input handleSubmit={addGratitude}/>
          }
          <div className="spacer" />
          {
            gratitudes.length > 0 &&
            <History 
              gratitudes={gratitudes}
              hasSubmittedToday={hasSubmittedToday}
            ></History>
          }
      </main>
      <style jsx>{`
        .spacer{
          height: 20px;
        }
      `}</style>

    </div>
  )
}
