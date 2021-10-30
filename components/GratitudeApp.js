import Greeting from './Greeting'
import History from './History'
import Input from './Input'
import {useEffect, useState} from 'react'

import { supabase } from '../utils/supabaseClient'

export default function GratitudeApp({ user }) {
  
  // [data value, updater function] = useState({default value of variable})

  const [gratitudes, setGratitudes] = useState([])
  const [hasSubmittedToday, setSubmittedToday] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // function, array of dependencies
  useEffect(() => {
    // run the fetchGratitudes() function
    // after the intitial render of the app
    // so we have access to the logged in user
    fetchGratitudes()
  }, [loading])

  const fetchGratitudes = async () => {
    // get the gratitudes data from supabase
    // set the value of gratitudes state to that data
    let { data: gratitudes, error } = await supabase
      .from('gratitudes')
      .select('entry, date_insert_ts')

    if(!error) {
      let currentTime = new Date().getTime()
      let mostRecentRecordTime = new Date(gratitudes.slice(-1)[0].date_insert_ts).getTime()
      let hoursSinceLastSubmission = (mostRecentRecordTime - currentTime)/3600000
      let didSubmitToday = (hoursSinceLastSubmission < 24)

      setGratitudes(gratitudes)
      setLoading(false)
      setSubmittedToday(didSubmitToday)
    } else {
      // there was an error
      console.log(error)
      setLoading(false)
      setError(error)
    }
  }

  const addGratitude = async (entry) => {
    const { data, error } = await supabase
      .from('gratitudes')
      .insert([
      { id: user.id, entry: entry },
    ])
    setLoading(true)
    if(error) {
      console.log(error)
      setError(error)
    }
    else {
      setGratitudes([...gratitudes, {'entry': entry, 'date_insert_ts': null }])
      setLoading(false)
      setSubmittedToday(true)
    }
  }

  /* Application is still fetching data */
  if (loading) {
    return <p className="text-blue-800">Loading...</p>
  }

  /* Something went wrong while fetching data*/
  if (error) {
    return <p className="text-blue-800">{error}</p>
  }

  /* Everything went as expected, show full app*/
  return (
    <div> 

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
