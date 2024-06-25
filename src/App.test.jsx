import { expect, describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

import colors from "./components/colorList";
import { getRandomIndex, getColorSet } from "./utils";

global.Audio = vi.fn().mockImplementation(() => ({
  pause: vi.fn(),
  play: vi.fn(() => Promise.resolve()),
}));

vi.mock("./utils");

describe("<App />", () => {
  it("should render the App component", () => {
    vi.mocked(getRandomIndex).mockReturnValue(1);
    vi.mocked(getColorSet).mockReturnValue([
      colors[0],
      colors[1],
      colors[2],
      colors[3],
    ]);

    const app = render(<App />);

    expect(app).toMatchSnapshot();
  });
});
