import "./Summary.css";

const Summary = ({ didWin, score, country, totalGuesses }) => {
    return (
      <>
        <div className="overlay"></div>
        <div className="summary-modal">
          <div className="summary-modalHeader">
            <h1>Summary</h1>
          </div>
          <div className="summary-modalContent">
            {didWin ? <>
              <p>
              You guessed <b>{country}</b> in <b>{score}</b> guesses
            </p>
            <ol>
              {totalGuesses.map((guess, idx) => {
                return (
                  <li
                    className="summary-item"
                    key={`guess-${idx}`}
                  >
                    {guess.guess}
                  </li>
                );
              })}
            </ol>
            </> : <><p>The correct country was <b>{country}</b></p>
              <ol>
              {totalGuesses.map((guess, idx) => {
                return (
                  <li
                    className="summary-item"
                    key={`guess-${idx}`}
                  >
                    {guess.guess}
                  </li>
                );
              })}
            </ol></>}
          </div>
        </div>
      </>
    );
};

export default Summary;
