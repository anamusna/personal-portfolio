import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { TestimonialAvatar } from "./testimonial-avatar";

describe("TestimonialAvatar", () => {
  it("shows initials, not a stand-in photo, when there is no image", () => {
    render(<TestimonialAvatar name="Ada Lovelace" size={64} className="x" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent("AL");
    expect(screen.queryByAltText("Ada Lovelace")).toBeNull();
  });

  it("falls back to initials when the image fails to load", () => {
    render(
      <TestimonialAvatar name="Grace Hopper" image="fabi.jpeg" size={64} className="x" />,
    );
    fireEvent.error(screen.getByAltText("Grace Hopper"));
    expect(screen.getByRole("img", { name: "Grace Hopper" })).toHaveTextContent("GH");
  });
});
