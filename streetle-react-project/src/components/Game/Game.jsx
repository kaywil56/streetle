import React, { useState, useEffect } from "react";
import countries from "../../assets/countries.json";
import Map from "./Map";
import Summary from "../Modals/Summary";
import Legend from "./Legend";
import "./Game.css";

const Game = () => {
  const MAX_GUESSES = 5;

  const [isGameOver, setIsGameOver] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [guess, setGuess] = useState("");
  const [currentCountry, setCurrentCountry] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});
  const [didWin, setDidWin] = useState(false);
  const [suggest, setSuggest] = useState([]);
  // Init array with question marks for legend
  const [totalGuesses, setTotalGuesses] = useState(
    [...Array(MAX_GUESSES)].map(() => "?")
  );

  // Checks if user input matches the current country
  const checkGuess = (e) => {
    e.preventDefault();
    let distanceBetween = checkDistanceBetween();
    let bearing = calcBearing();
    let updatedList = totalGuesses;
    // Update legend list with the most recent guess and the KM away from correct guess
    updatedList[guessCount] = `${guess} ${distanceBetween}KM`;
    setTotalGuesses(updatedList);
    setGuessCount(guessCount + 1);
    console.log(
      "angle of direction from guess to correct country in degrees:",
      bearing
    );
    console.log(`${guess} to ${currentCountry.name} is ${distanceBetween}KM`);
    // Convert to lower case to stop case sensitive input and check the guess
    if (guess.toLowerCase() == currentCountry.name.toLowerCase()) {
      // Reset guess
      setGuess("");
      setDidWin(true);
      setIsGameOver(true);
      console.log("Win");
    } else if (guessCount == MAX_GUESSES - 1) {
      setIsGameOver(true);
    }
    setGuess("");
  };

  // Gets the lat and long for the center of the guessed country
  const getGuessCountryCenter = () => {
    // Search countries list and find guess country object
    const guessCountryCenter = countries.find(
      ({ name }) => name.toLowerCase() === guess.toLowerCase()
    );
    return guessCountryCenter.country_center;
  };

  // Checks the distance between the guess and current country coords
  const checkDistanceBetween = (unit = "kilometers") => {
    let guessCountryCenter = getGuessCountryCenter();
    console.log(guessCountryCenter);
    console.log(currentCountry.country_center);
    let theta =
      currentCountry.country_center.longitude - guessCountryCenter.longitude;
    let distance =
      60 *
      1.1515 *
      (180 / Math.PI) *
      Math.acos(
        Math.sin(currentCountry.country_center.latitude * (Math.PI / 180)) *
          Math.sin(guessCountryCenter.latitude * (Math.PI / 180)) +
          Math.cos(currentCountry.country_center.latitude * (Math.PI / 180)) *
            Math.cos(guessCountryCenter.latitude * (Math.PI / 180)) *
            Math.cos(theta * (Math.PI / 180))
      );
    if (unit == "miles") {
      return Math.round(distance, 2);
    } else if (unit == "kilometers") {
      return Math.round(distance * 1.609344, 2);
    }
  };

  const calcBearing = () => {
    let guessCountryCenter = getGuessCountryCenter();
    let lat1 = guessCountryCenter.latitude;
    let lon1 = guessCountryCenter.longitude;
    let lat2 = currentCountry.country_center.latitude;
    let lon2 = currentCountry.country_center.longitude;

    const toRadians = (degree) => {
      return degree * (Math.PI / 180);
    };
    const x = Math.cos(toRadians(lat2)) * Math.sin(toRadians(lon2 - lon1));
    const y =
      Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) -
      Math.sin(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.cos(toRadians(lon2 - lon1));

    let beta = Math.atan2(x, y);
    beta = (beta * 180) / Math.PI;

    return beta.toFixed(2);
  };

  // Fill auto suggest list based on guess
  const autocompleteMatch = () => {
    let reg = new RegExp(guess);
    let filteredCountryList = countries.filter((country) => {
      if (country.name.match(reg)) {
        return country;
      }
    });
    setSuggest(filteredCountryList);
  };

  // When guess is being typed, refill auto suggest list
  useEffect(() => {
    autocompleteMatch();
  }, [guess]);

  // Choose random country on mount
  useEffect(() => {
    let randomCountryIdx = Math.floor(Math.random() * countries.length);
    setCurrentCountry(countries[randomCountryIdx]);
    console.log(currentCountry);
    // let randomLocationId = Math.floor(Math.random() * currentCountry?.largest_cities.length);
    // setCurrentLocation(currentCountry.largest_cities[randomLocationId])
  }, []);

  // Randomize the location within the selected country
  useEffect(() => {
    if (currentCountry.largest_cities) {
      let randomLocationIdx = Math.floor(
        Math.random() * currentCountry.largest_cities.length
      );
      setCurrentLocation(currentCountry.largest_cities[randomLocationIdx]);
    }
    console.log(currentCountry.name);
    console.log("current location: " + JSON.stringify(currentLocation));
  }, [currentCountry]);

  return (
    <>
      {!isGameOver ? (
        <>
          <Legend
            MAX_GUESSES={MAX_GUESSES}
            guessCount={guessCount}
            totalGuesses={totalGuesses}
          />
          <Map currentLocation={currentLocation} />
          <form className="guessArea" onSubmit={checkGuess}>
            <input
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter a country"
              list="autocomplete"
            ></input>
            {guess.length > 0 && (
              <datalist id="autocomplete">
                {suggest.map((country, idx) => {
                  return <option id={idx} value={country.name} />;
                })}
              </datalist>
            )}
            <button type="submit">Guess</button>
          </form>
        </>
      ) : (
        <Summary
          didWin={didWin}
          score={guessCount}
          country={currentCountry.name}
        />
      )}{" "}
    </>
  );
};

export default Game;
