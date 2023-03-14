import "./Legend.css";

const Legend = ({ guessCount, MAX_GUESSES, totalGuesses }) => {
  const compassDirections = {
    N: "0",
    NE: "45",
    E: "90",
    SE: "135",
    S: "180",
    SW: "225",
    W: "270",
    NW: "315",
  };

  return (
    <table id="score-container">
      <thead>
        <tr>
          <td>
            {guessCount}/{MAX_GUESSES}
          </td>
        </tr>
      </thead>
      <tbody>
        {totalGuesses.map((guess, idx) => {
          if (guess != undefined) {
            return (
              <tr key={"legend-tr" + idx}>
                <td key={"legend-td" + idx}>{guess.guess}</td>
                <td key={"legend-td" + idx + 1}>
                  <div className="compass">
                    <img
                      style={{
                        transform: `rotate(${
                          compassDirections[guess.bearing]
                        }deg)`
                      }}
                      src="/icons/compass.png"
                      alt="compass"
                    />
                  </div>
                </td>
                <td key={"legend-td" + idx + 2}>{guess.distance}KM</td>
                <td key={"legend-td" + idx + 3}>
                  <div
                    className={
                      guess.continent
                        ? "icon icon-correct"
                        : "icon icon-not-correct"
                    }
                  >
                    <img src="/icons/africa.png" alt="continent" />
                  </div>
                </td>
                <td key={"legend-td" + idx + 4}>
                  <div
                    className={
                      guess.border
                        ? "icon icon-correct"
                        : "icon icon-not-correct"
                    }
                  >
                    <img src="/icons/border.png" alt="continent" />
                  </div>
                </td>
                <td key={"legend-td" + idx + 5}>
                  <div
                    className={
                      guess.hemisphere
                        ? "icon icon-correct"
                        : "icon icon-not-correct"
                    }
                  >
                    <img src="/icons/hem.png" alt="hemisphere" />
                  </div>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={"unknown-tr" + idx}>
                <td
                  key={"unknown-td" + idx}
                  className="guess-amount"
                  colSpan="6"
                >
                  ?
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default Legend;
