const BASE_URL =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1";

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response;
  }
}

/* To parse response to JSON object */
export function parseJSON(response) {
  return response.json();
}

/* Generate image url */
export function getImageUrl(farm, server, id, secret) {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}
