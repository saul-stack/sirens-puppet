import { useEffect } from "react"

export default function RoundPage({round, setRound}){
    useEffect(() => {
        setRound((currentRound) => currentRound + 1)
    }, [setRound])
    console.log(round)
    return (
        <main>
            <h1>{`Round ${round} : Picture Round`}</h1>
        </main>
    )
}