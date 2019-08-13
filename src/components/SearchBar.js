import React from "react";
import "./SearchBar.css";
import _ from "lodash";
import { checkHttpStatus, parseJSON, getImageUrl } from "../flickrUtils";

const BASE_URL =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=847b43221e688059973358acc1294ba5&per_page=20";
const BASE =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1";

export default class SearchBar extends React.Component {
  state = {
    searchText: "",
    images: [],
    queries: []
  };

  checkHttpStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw response;
    }
  };

  /* To parse response to JSON object */
  parseJSON = response => {
    return response.json();
  };

  /* Generate image url */
  getImageUrl = (farm, server, id, secret) => {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  };

  componentDidMount() {
    this.makeDebouncedSearch = _.debounce(() => {
      /* Save search query */
      //   this.state.queries.push(this.state.searchText);
      //   this.setState({ queries: this.state.queries }, this.updateLocalStorage());

      /* Make API call for the query */
      const url = BASE + "&text=" + this.state.searchText;
      console.log("url: " + url);
      fetch(url)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(resp => {
          console.log(resp.photos.photo);
          this.setState({ images: resp.photos.photo });
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000);
  }

  updateSearch = search => {
    console.log(search.target.value);
    this.setState({ searchText: search.target.value });
    this.makeDebouncedSearch(search.target.value);
    const images = this.state.images;
    console.log("images: " + images);
    if (!_.isEmpty(this.state.images)) {
      const { farm, server, id, secret } = this.state.images[2];
      console.log(this.getImageUrl(farm, server, id, secret));
    }
  };

  render() {
    return (
      <div>
        <form className="flexContainer">
          <h2>Image Gallery</h2>
          <input
            className="inputStyle"
            type="text"
            placeholder="Search for image"
            onChange={this.updateSearch}
          />
        </form>
      </div>
    );
  }
}
