import React from "react";
import "./howToPlay.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className="overlay"></div>
      <div onClick={() => setIsOpen(false)} />
      <div className="modal">
        <div className="modalHeader">
          <h1>HOW TO PLAY</h1>
        </div>
        <button className="closeBtn" onClick={() => setIsOpen(false)}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <div className="modalContent">
          <p>
            <h2>Objective:</h2>
            utilize Google Street View and other available clues to guess your
            current location in the world within 5 attempts.
          </p>
          <p>
            <h2>Gameplay:</h2>
            After each guess, you will receive distance, direction, continent,
            border, and hemisphere information to assist you in triangulating
            your current location.
            <p className="example-text">Example:</p>
            <div className="img-cont">
              <img src="htp-legend.png" alt="how to play legend example" />
            </div>
            <p>
              In the above example we successfully guessed Iceland by using the
              previous clues.
            </p>
            <h2>Tips:</h2>
            Take advantage of the additional information provided by Google
            Street View, such as signs, architecture, language, and other visual
            cues.
          </p>
          <p>
            <h2 className="footNote">
              Good luck and have fun playing Streetle!
            </h2>
          </p>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                PLAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
