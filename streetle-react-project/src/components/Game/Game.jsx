import React, { useState, useEffect } from "react";
import countries from "../../assets/countries.json";
import Map from "./Map";
import Summary from "../Modals/Summary";
import "./Game.css";

const Game = () => {
  const MAX_GUESSES = 3;

  const [isGameOver, setIsGameOver] = useState(false)
  const [guessCount, setGuessCount] = useState(0);
  const [guess, setGuess] = useState("");
  const [currentCountry, setCurrentCountry] = useState(null);
  const [didWin, setDidWin] = useState(false);

  // Checks if user input matches the current country
  const checkGuess = (e) => {
    e.preventDefault();
    setGuessCount(guessCount + 1);
    if (guess == currentCountry.country) {
      // Reset guess
      setGuess("");
      // // Generate random integer
      // let randomCountryIdx = Math.floor(Math.random() * countries.length);
      // setCurrentCountry(countries[randomCountryIdx]);
      setDidWin(true)
      setIsGameOver(true)
      console.log("Win");
    }else if(guessCount == MAX_GUESSES - 1){
      setIsGameOver(true)
    }
    setGuess("");
  };

  // Choose random country on mount
  useEffect(() => {
    let randomCountryIdx = Math.floor(Math.random() * countries.length);
    setCurrentCountry(countries[randomCountryIdx]);
    console.log(currentCountry);
  }, []);

  return (
    <>
      {!isGameOver ? (
        <>
          <div id="score-container">
            {guessCount}/{MAX_GUESSES}
          </div>
          <Map currentCountry={currentCountry} />
          <form className="guessArea" onSubmit={checkGuess}>
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter a country"
            ></input>
            <button type="submit">Guess</button>
          </form>
        </>
      ) : (
        <Summary didWin={didWin} score={guessCount} country={currentCountry.country} />
      )}{" "}
    </>
  );
};

export default Game;
