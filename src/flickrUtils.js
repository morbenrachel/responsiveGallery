import constants from "./constants";

//status in constants
//turn into arrow functions for ahidut

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
