import { useState, useEffect } from "react";
import "./App.css";

import colors from "./components/colorList";

const scoreAninationDuration = 0.5;

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
      ).style.animation = `jump-shake ${scoreAninationDuration}s`;
      setScore(score + 1);
      setQuestionColor();
      setFourColors([]);
      generateColor();
      setCorrect(true);
      setTimeout(() => {
        setCorrect(false);
        document.getElementById("Score").style.animation =
          null;
      }, scoreAninationDuration * 1000 + 500);
    } else {
      setQuestionColor();
      setFourColors([]);
      generateColor();
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, 1000);
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
      setTimeout(() => {
        const english = questionColor?.english;

        if (english !== undefined) {
          const audio = new Audio(`sounds/${english}.mp3`);
          audio.play();
        }
      }, 1000);
    }
  }, [questionColor, soundOn]);

  useEffect(() => {
    generateColor();
    createKeyPressListener();
  }, []);

  return (
    <div className="pageWrapper">
      <div className="scoreWrapper">
        <input
          defaultChecked={true}
          onChange={() => setSoundOn(!soundOn)}
          type="checkbox"
        />
        <p id="Score" className="scoreText">
          Score: {` ${score}`}
        </p>
      </div>
      <div className="squaresWrapper">
        <div className="">
          <h1>
            Please click on
            {` ${questionColor?.french || "..."}`}
          </h1>
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
                  />
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
    </div>
  );
};

export default App;
