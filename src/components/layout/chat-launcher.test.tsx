import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "../../i18n";
import { SpotlightSearchProvider } from "../../hooks/useSpotlightSearch";
import ChatLauncher from "./chat-launcher";

const Harness: React.FC = () => {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <MemoryRouter>
      <SpotlightSearchProvider>
        <ChatLauncher launcherRef={ref} />
      </SpotlightSearchProvider>
    </MemoryRouter>
  );
};

describe("ChatLauncher", () => {
  it("is a labelled button that reports and toggles the chat state", () => {
    render(<Harness />);

    const launcher = screen.getByRole("button", {
      name: /open pre-written answers about ansu/i,
    });
    expect(launcher).toHaveAttribute("aria-expanded", "false");
    expect(launcher).toHaveAttribute("aria-controls", "spotlight-chat-panel");

    fireEvent.click(launcher);
    expect(
      screen.getByRole("button", { name: /close quick answers/i }),
    ).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("button", { name: /close quick answers/i }));
    expect(
      screen.getByRole("button", { name: /open pre-written answers about ansu/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
