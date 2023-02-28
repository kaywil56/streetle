import React, { useState, useEffect } from "react";
import countries from "../../assets/countries.json";
import Map from "./Map";
import Summary from "../Modals/Summary";
import "./Game.css";

const Game = () => {
  const MAX_GUESSES = 5;

  const [isGameOver, setIsGameOver] = useState(false)
  const [guessCount, setGuessCount] = useState(0);
  const [guess, setGuess] = useState("");
  const [currentCountry, setCurrentCountry] = useState({});
  const [currentLocation, setCurrentLocation] = useState({})
  const [didWin, setDidWin] = useState(false);

  // Checks if user input matches the current country
  const checkGuess = (e) => {
    e.preventDefault();
    setGuessCount(guessCount + 1);
    // Convert to lower case to stop case sensitive input and check the guess
    if (guess.toLowerCase() == currentCountry.name.toLowerCase()) {
      // Reset guess
      setGuess("");
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
    console.log(currentCountry)
    // let randomLocationId = Math.floor(Math.random() * currentCountry?.largest_cities.length);
    // setCurrentLocation(currentCountry.largest_cities[randomLocationId])
  }, []);

  // Randomize the location within the selected country
  useEffect(() => {
    if (currentCountry.largest_cities) {
      let randomLocationIdx = Math.floor(Math.random() * currentCountry.largest_cities.length);
      setCurrentLocation(currentCountry.largest_cities[randomLocationIdx]);
    }
    console.log(currentCountry.name)
    console.log("current location: " + JSON.stringify(currentLocation))

  }, [currentCountry]);

  return (
    <>
      {!isGameOver ? (
        <>
          <div id="score-container">
            {guessCount}/{MAX_GUESSES}
          </div>
          <Map currentLocation={currentLocation} />
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
        <Summary didWin={didWin} score={guessCount} country={currentCountry.name} />
      )}{" "}
    </>
  );
};

export default Game;
