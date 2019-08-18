const constants = {
  DEBOUNCE_VALUE: 500,
  SEARCHES_STORAGE_THRESHOLD: 5,
  IMAGES_PER_PAGE: 30,
  BOTTOM_SUCCESS_STATUS_CODE: 200,
  TOP_SUCCESS_STATUS_CODE: 300,
  LOCAL_STORAGE_KEY: "savedSearches",
  FLICKR_BASE_URL:
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1"
};
export default constants;
