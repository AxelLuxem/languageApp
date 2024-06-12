import { useEffect } from "react";
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
  const fourColors = [];

  for (let i = 0; i < 4; i++) {
    let color;
    let alreadyExists;
    do {
      const index = Math.floor(
        Math.random() * colors.length
      );
      color = colors[index];

      alreadyExists = fourColors.findIndex(
        (item) => item.english === color.english
      );
    } while (alreadyExists > -1);

    fourColors.push(color);
  }

  return (
    <div className="colorWrapper">
      {fourColors.map((item, index) => {
        const { english } = item;
        return (
          <div
            key={index}
            style={{
              backgroundColor: `${english.toLowerCase()}`,
            }}
            className="colorSquare"
          />
        );
      })}
    </div>
  );
}

export default App;
