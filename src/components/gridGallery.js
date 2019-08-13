import React from "react";
import "./gridGallery.css";

export default class gridGallery extends React.Component {
  render() {
    return `<div className="image-grid" style={{ marginTop: "30px" }}>
    {loaded
      ? images.map((image, index) => (
          <UnsplashImage url={image.urls.regular} key={index} />
        ))
      : ""}
  </div>`;
  }
}
