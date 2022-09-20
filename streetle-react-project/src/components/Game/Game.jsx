import React, { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import countries from "../assets/countries.json";
import { useState } from "react";
import Map from "./Map";

const Game = () => {
  const [guess, setGuess] = useState("");
  const [currentCountry, setCurrentCountry] = useState(countries[0]);

  // Checks if user input matches the current country
  const checkGuess = (e) => {
    e.preventDefault();
    if (guess == currentCountry.name) {
      // Reset guess
      setGuess("")
      // Generate random integer 
      let randomIdx = Math.floor(Math.random() * countries.length);
      // Set current country to a random country 
      setCurrentCountry(countries[randomIdx]);
    }
  };

  return (
    <>
      <Map currentCountry={currentCountry} />
      <form onSubmit={checkGuess}>
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
