import {useState} from 'react'

export default function Input({handleSubmit}) {
    const [value, setValue] = useState("")

    let submitForm = e => {
        e.preventDefault()
        handleSubmit(value)
        setValue("")
    }
    
    return (
        <form onSubmit={submitForm}>
            <input placeholder="Enter Gratitude" type="text" value={value} onChange={e => setValue(e.target.value)}
                className="mr-2 rounded px-3 py-2 placeholder-yellow-200 text-blue-800">
            </input>
            <button type="submit" className="bg-yellow-300 hover:bg-yellow-400 rounded px-12 py-2 text-blue-800">Save</button>
        </form>
    )
}