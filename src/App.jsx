import { useState, useEffect } from "react";
import "./App.css";

import colors from "./components/colorList";

const scoreAnimationDuration = 0.5;

const App = () => {
  const [score, setScore] = useState(0);
  const [questionColor, setQuestionColor] = useState();
  const [fourColors, setFourColors] = useState([]);
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const generateColor = () => {
    const colorSet = [];

    for (let i = 0; i < 4; i++) {
      let color;
      let alreadyExists;
      do {
        const index = Math.floor(
          Math.random() * colors.length
        );
        color = colors[index];

        alreadyExists = colorSet.findIndex(
          (item) => item.english === color.english
        );
      } while (alreadyExists > -1);
      colorSet.push(color);
    }

    setFourColors(colorSet);
    const questionColorIndex = Math.floor(
      Math.random() * fourColors.length
    );
    const colorObjectSelected =
      colorSet[questionColorIndex];
    setQuestionColor(colorObjectSelected);
  };

  const submitAnswer = (answer) => {
    if (answer === questionColor.french) {
      document.getElementById(
        "Score"
      ).style.animation = `jump-shake ${scoreAnimationDuration}s`;
      setScore(score + 1);
      setQuestionColor();
      setFourColors([]);
      setCorrect(true);

      setTimeout(() => {
        generateColor();
        setCorrect(false);
        document.getElementById("Score").style.animation =
          null;
      }, scoreAnimationDuration * 1000 + 500);
    } else {
      setQuestionColor();
      setFourColors([]);
      setWrong(true);

      setTimeout(() => {
        generateColor();
        setWrong(false);
      }, 1000);
    }
  };

  const playSound = () => {
    const english = questionColor?.english;
    console.log("in the playSounds");

    if (english !== undefined) {
      questionColor.audio.play();
    }
  };

  const keypress = (event) => {
    const key = event.key;
    if (
      key === "1" ||
      key === "2" ||
      key === "3" ||
      key === "4"
    ) {
      const keypressInput =
        document.getElementById("keypressInput");
      keypressInput.value = key;
      keypressInput.focus();
    }
  };

  const createKeyPressListener = () => {
    document.addEventListener("keypress", keypress);
  };

  useEffect(() => {
    if (soundOn) {
      playSound();
    }
  }, [questionColor, soundOn]);

  useEffect(() => {
    generateColor();
    createKeyPressListener();
  }, []);

  return (
    <div className="pageWrapper">
      <div className="heading">
        <div className="block">
          <div className="toggleSwitchWrapper">
            <label className="switchText">Sound</label>
            <label className="switch">
              <input
                id="switch"
                defaultChecked={true}
                onChange={() => setSoundOn(!soundOn)}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="scoreWrapper block">
          <p id="Score" className="scoreText">
            Score: {` ${score}`}
          </p>
        </div>
        <div className="block"></div>
      </div>
      <div className="squaresWrapper">
        <div className="test">
          <h2>
            Please click on
            {` ${questionColor?.french || "..."}`}
          </h2>
          <div className="colorGrid">
            {correct ? (
              <img className="answer" src="Checkmark.png" />
            ) : wrong ? (
              <img className="answer" src="Red-X.png" />
            ) : (
              fourColors.map((item, index) => {
                const { english } = item;
                return (
                  <button
                    key={index}
                    style={{
                      backgroundColor: `${english.toLowerCase()}`,
                    }}
                    className="colorSquare"
                    onClick={() =>
                      submitAnswer(item.french)
                    }
                  >
                    {index + 1}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
      <form>
        <input
          id="keypressInput"
          type="text"
          className="hiddenInput"
          onFocus={() => {
            const fourColorsInput =
              document.getElementById("keypressInput");
            const value = fourColorsInput.value;
            submitAnswer(fourColors[value - 1].french);
            document.activeElement.blur();
          }}
        />
      </form>
      <div className="instructionsWrapper">
        <h3>----How to play----</h3>
        <p>
          To play you have to click on colored square that
          corresponds to the color that is written above the
          four squares.
          <br />
          You can either left click on the chosen square, or
          use numbers 1-4 to choose a square
        </p>
        <p>
          If you wish to turn the sound off, then you can do
          so by using the slider at the top left of the page
        </p>
      </div>
    </div>
  );
};

export default App;
