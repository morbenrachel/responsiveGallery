import constants from "./constants";

const BASE_URL =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1";

function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response;
  }
}

function getImagesArray(response) {
  console.log("inside getimagesarray");
  if (response.photos.total > 0) {
    return response.photos.photo;
  } else {
    return [];
  }
}

export async function fetchImagesAsync(searchValue) {
  const url =
    constants.FLICKR_BASE_URL +
    "&text=" +
    searchValue +
    "&per_page=" +
    constants.IMAGES_PER_PAGE;
  try {
    const response = await fetch(url);
    checkHttpStatus(response);
    const data = await response.json();
    let imagesArray = await getImagesArray(data);
    return imagesArray;
  } catch (err) {
    console.log(err);
  }
}

export function getImageUrl(farm, server, id, secret) {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}
