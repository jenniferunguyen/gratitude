export default function Greeting({user, gratitudes, hasSubmittedToday}){
    
    return (
        <div className="text-blue-800 text-6xl">
            <h1>
                Hello, <span className="text-yellow-400"> {user.email}</span>!
            </h1>
            {
                hasSubmittedToday ? (
                    <h2 className="font-black">Today you're grateful for {gratitudes.slice(-1)[0]}</h2>
                ) : (
                    <h2 className="font-black">What are you grateful for today?</h2>
                )
            }
        </div>
        
    )
}
