import Greeting from './Greeting'
import History from './History'
import Input from './Input'
import {useEffect, useState} from 'react'

import { supabase } from '../utils/supabaseClient'

export default function GratitudeApp({ user }) {
  
  // [data value, updater function] = useState({default value of variable})

  const [gratitudes, setGratitudes] = useState([])

  const [hasSubmittedToday, setSubmittedToday] = useState(false)

  // function, array of dependencies
  useEffect(() => {
    // run the fetchGratitudes() function
    // after the intitial render of the app
    // so we have access to the logged in user
    fetchGratitudes()
  }, [])

  const fetchGratitudes = async () => {
    // get the gratitudes data from supabase
    // set the value of gratitudes state to that data
    let { data: gratitudes, error } = await supabase
      .from('gratitudes')
      .select('entry, date_insert_ts')

    if(!error) {
      setGratitudes(gratitudes)
    } else {
      console.log(error)
    }
  }

  const addGratitude = async (entry) => {
    const { data, error } = await supabase
      .from('gratitudes')
      .insert([
      { id: user.id, entry: entry },
    ])
    if(error) {console.log(error)}
    else {
      setGratitudes([...gratitudes, {'entry': entry, 'date_insert_ts': null }])
    }

  }

  return (
    <div className="bg-gradient-to-t from-green-200 to-blue-200 min-h-screen min-w-screen"> 

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
