import {useState} from 'react'

export default function History({gratitudes, hasSubmittedToday}){

    const [value, setValue] = useState("3")

    let submitForm = e => {
        e.preventDefault()
        setValue(value)
    }

    const checkDate = (e) => {
        let currentDate = new Date()
        let entryDate = new Date(e.date_insert_ts)
        let timeBetweenDates = (currentDate - entryDate)/86400000
        if (value == "1"){
            if (timeBetweenDates < 7) {
                return ' '+e.entry
            } 
        } else if (value == "2"){
            if (timeBetweenDates < 30) {
                return ' '+e.entry
            }
        } else {
            return ' '+e.entry
        }
    }

    
    return (
        <div>
            <form onSubmit={submitForm}>
                <select name="time-filter" id="time-filter" className="mr-2 rounded px-3 py-2 text-blue-800"
                value={value} onChange={e => setValue(e.target.value)}>
                    <option value="1">Last week</option>
                    <option value="2">Last month</option>
                    <option value="3">All time</option>
                </select>
            </form>
            
            {
                hasSubmittedToday ? (
                    <p className="text-blue-800 text-2xl">Previously, you were grateful for 
                        <span className="font-bold">
                            {gratitudes.slice(0, -1).filter(g => checkDate(g)).map(g => checkDate(g)).toString()} 
                        </span>
                    </p>
                ) : (
                    <p className="text-blue-800 text-2xl">Previously, you were grateful for 
                        <span className="font-bold">
                            {gratitudes.filter(g => checkDate(g)).map(g => checkDate(g)).toString()} 
                        </span>
                    </p>
                )
                
            }
        </div>
    )

}