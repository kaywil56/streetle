const Summary = ({ didWin, score, country }) => {
    if(didWin){
        return <div>You guessed {country} in {score} guesses</div>
    }
    else{
        return <div>The country was {country}</div>
    }
}

export default Summary