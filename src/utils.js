import colors from "./components/colorList";

export const getRandomIndex = (numberColors) => {
  return Math.floor(Math.random() * numberColors);
};

export const getColorSet = () => {
  const colorSet = [];

  for (let i = 0; i < 4; i++) {
    let color;
    let alreadyExists;
    do {
      const index = getRandomIndex(colors.length);
      color = colors[index];

      alreadyExists = colorSet.findIndex(
        (item) => item.english === color.english
      );
    } while (alreadyExists > -1);
    colorSet.push(color);
  }

  return colorSet;
};
