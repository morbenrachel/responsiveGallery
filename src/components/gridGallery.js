import React from "react";
import "./GridGallery.css";
import { getImageUrl } from "../flickrUtils";

//todo - limit num of images to render / add pagination

export default class GridGallery extends React.Component {
  getImages = () => {
    return this.props.images.map(image => {
      const { farm, server, id, secret } = image;
      const imageUrl = getImageUrl(farm, server, id, secret);
      return (
        <div className="image-item" key={id}>
          <img src={imageUrl} alt={id} width="200px" />
        </div>
      );
    });
  };

  render() {
    return <div className="image-grid">{this.getImages()}</div>;
  }
}
