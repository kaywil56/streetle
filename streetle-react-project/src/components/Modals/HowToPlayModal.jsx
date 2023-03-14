import React from "react";
import "./howToPlay.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div onClick={() => setIsOpen(false)} />
         <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">HOW TO PLAY</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            <p>
              <h3>Objective:</h3> 
              Use the street view image to correctly guess which country in the world you are in.
            </p>
            <p>
              <h3>Gameplay:</h3> 
              - Look closely at the street view image to gather clues about the countries location.
              <br />
              - Type your guess into the input area at the bottom of the screen.
              <br />
              - Click the "Guess" button to submit your guess.
              <br />
              - You have 5 guesses to correctly guess the country and win the round.
              <br />
              - Each incorrect guess outputs useful data into the legend in the top right corner of the screen.
              <br />
              - The legend displays the following information:
              <ul>
                <li>The name of the country you guessed.</li>
                <li>The direction from your guessed country to the correct country.</li>
                <li>The distance between your guessed country and the correct country in kilometers.</li>
                <li>The first icon represents the continent (Is your guess in the correct continent?)</li>
                <li>The second icon represents bordering countries (Does your guess share a border with the correct country?)</li>
                <li>The third icon represents the hemisphere (Have you guessed in the correct hemisphere?)</li>
              </ul>
              - Icons will turn green if your guess matches the attributes of the icons.
            </p>
            <p>
              <h3>Tips:</h3> 
              - Pay close attention to the details in the street view image.
              <br />
              - Use the legend to guide your next guess.
              <br />
              - Take note of the information displayed in the legend to help you make more informed guesses.
            </p>
            <p>
              <h3 className="footNote">Good luck and have fun playing Streetle!</h3>
            </p>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="cancelBtn"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div> 
  </>
  );
};

export default Modal;