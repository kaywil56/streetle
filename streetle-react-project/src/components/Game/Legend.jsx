import "./Legend.css";

const Legend = ({ guessCount, MAX_GUESSES, totalGuesses }) => {

  return (
    <div id="score-container">
      {guessCount}/{MAX_GUESSES}
      {totalGuesses.map((guess, idx) => {
        return <p key={idx}>{guess}</p>;
      })}
    </div>
  );
};

export default Legend;
