import { useState, useEffect } from "react";
import "./App.css";

const colors = [
  { english: "Red", french: "Rouge" },
  { english: "Green", french: "Vert" },
  { english: "Blue", french: "Bleu" },
  { english: "Yellow", french: "Jaune" },
  { english: "Pink", french: "Rose" },
  { english: "Gray", french: "Gris" },
  { english: "Orange", french: "Orange" },
  { english: "Brown", french: "Marron" },
  { english: "Purple", french: "Violet" },
];

function App() {
  const [score, setScore] = useState(0);
  const [questionColor, setQuestionColor] = useState(0);
  const [fourColors, setFourColors] = useState([]);
  // const [selectedColor, setSelectedColor] = useState("");

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
    setQuestionColor(
      Math.floor(Math.random() * fourColors.length)
    );
    // setQuestionColor(
    //   fourColors[
    //     Math.floor(Math.random() * fourColors.length)
    //   ]?.french
    // );
  };

  const submitAnswer = (answer) => {
    if (answer === fourColors[questionColor].french) {
      setScore(score + 1);
      generateColor();
    } else {
      generateColor();
    }
  };

  useEffect(() => {
    generateColor();
  }, []);

  console.log(score);
  console.log(JSON.stringify(fourColors));

  return (
    <div>
      <div className="scoreWrapper">
        <p>Score: {` ${score}`}</p>
      </div>
      <div className="pageWrapper">
        <h1>
          Please click on
          {` ${fourColors[questionColor]?.french || "..."}`}
        </h1>
        {/* <h1>
        Please click on {` ${questionColor || "..."}`}
      </h1> */}
        <div className="colorGrid">
          {fourColors.map((item, index) => {
            const { english } = item;
            return (
              <button
                key={index}
                style={{
                  backgroundColor: `${english.toLowerCase()}`,
                }}
                className="colorSquare"
                onClick={() => submitAnswer(item.french)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
