export default function History({gratitudes, hasSubmittedToday}){
    
    return (
        <div>
            {
                hasSubmittedToday ? (
                    <p className="text-blue-800 text-2xl">Previously, you were grateful for 
                        <span className="font-bold">
                            {gratitudes.slice(0, -1).map(g => ' '+g).toString()} 
                        </span>
                    </p>
                ) : (
                    <p className="text-blue-800 text-2xl">Previously, you were grateful for 
                        <span className="font-bold">
                            {gratitudes.map(g => ' '+g).toString()} 
                        </span>
                    </p>
                )
            }
        </div>
    )

}