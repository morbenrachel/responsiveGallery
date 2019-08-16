import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import constants from "./constants";
import { exportAllDeclaration } from "@babel/types";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it("does not render image list after text input was deleted", () => {}); //not sure according to guidelines that this is correct

// it("should show saved searches if there are any in localStorage");

// it("should render grid gallery if there are images in the state");

// describe("<GridGallery/>", () => {});

// describe("localStorage logic", function() {
//   it("should limit that amount of search terms saved in the localStorage according to SEARCHES_STORAGE_THRESHOLD", () => {});

//   it("should knock out the oldest search term from localStorage if SEARCHES_STORAGE_THRESHOLD passed", () => {});

//   it("should not save a search term that's already in the localStorage", () => {});
// });

// it("");
