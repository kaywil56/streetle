import React, { useState, useEffect } from "react";
import countries from "../../assets/countries.json";
import Map from "./Map";
import "./Map.css";

const Game = () => {
  const [guess, setGuess] = useState("");
  const [currentCountry, setCurrentCountry] = useState(null);

  // Checks if user input matches the current country
  const checkGuess = (e) => {
    e.preventDefault();
    if (guess == currentCountry.country) {
      // Reset guess
      setGuess("");
      // Generate random integer
      let randomCountryIdx = Math.floor(Math.random() * countries.length);
      setCurrentCountry(countries[randomCountryIdx]);
    }
  };

  // Choose random country on mount
  useEffect(() => {
    let randomCountryIdx = Math.floor(Math.random() * countries.length);
    setCurrentCountry(countries[randomCountryIdx]);
  }, [])

  return (
    <>
      <form onSubmit={checkGuess}>
          <Map currentCountry={currentCountry} />
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter a country"
        ></input>
        <button type="submit">Guess</button>
      </form>
    </>
  );
};

export default Game;
