import { useState } from "react";
import Map from "./Map";

const countries = [
  {
    name: "New Zealand",
    url: "https://media.istockphoto.com/photos/the-octagon-street-view-of-dunedin-city-in-new-zealand-picture-id1215747313?k=20&m=1215747313&s=170667a&w=0&h=0HzcfQKVezz2SvgtOjBKP4PZQ-yIUbL1UTE0l-k2SV0=",
  },
  {
    name: "Australia",
    url: "https://img.traveltriangle.com/blog/wp-content/uploads/2018/12/Cover-for-Sydney-Harbour-Bridge.jpg",
  },
  {
    name: "Singapore",
    url: "https://i.ytimg.com/vi/mz0tvOcJuz8/maxresdefault.jpg",
  },
  {
    name: "France",
    url: "https://www.google.com/maps/about/images/treks/eiffel5-carousel.jpg",
  },
  {
    name: "America",
    url: "https://media.nomadicmatt.com/2018/nyc_hostels.jpg",
  },
];

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
