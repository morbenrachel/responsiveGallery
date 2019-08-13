import React from "react";
import Search from "./components/SearchBar";
import Gallery from "./components/gridGallery";
import "./App.css";
import { checkHttpStatus, parseJSON, getImageUrl } from "./flickrUtils";
import _ from "lodash";

const key =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1";

export default class App extends React.Component {
  state = {
    searchValue: "",
    images: []
  };

  constructor(props) {
    super(props);
    this.fetchImages = _.debounce(this.fetchImages, 200);
  }

  fetchImages(searchValue) {
    const url = key + "&text=" + this.state.searchValue;
    fetch(url)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(resp => {
        console.log(resp);
        this.setState({ images: resp.photos.photo });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateSearch = searchValue => {
    //trigger flickr api
    console.log("search field entered: " + searchValue);
    this.setState({ searchValue });
    console.log("fetch images before call");
    this.fetchImages(searchValue);
  };

  componentWillUnmount() {
    this.updateSearch.cancel();
  }

  renderGallery = () => <div className="image-grid">{this.renderImages()}</div>;
  renderImages = () => {
    console.log("inside render images");
    return this.state.images.map(image => {
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
    return (
      <div>
        <div className="app-container">
          {/* <Search /> */}
          <h2>Image Gallery</h2>
          <input
            onChange={e => this.updateSearch(e.target.value)}
            placeholder="Search for images..."
          />
        </div>
        {this.state.images.length > 0 ? this.renderGallery() : ""}
      </div>
    );
  }
}
