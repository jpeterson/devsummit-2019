import { get } from 'axios';
import { uniqBy } from 'lodash';

/**
 * Returns on object of details on the top image search result for the incoming query.
 * @param {number} lat - latitude for the query
 * @param {number} lng - longitude for the query
 * @param {number} back - number of days back to search
 * @param {number} dist - distance to search from lat/lng
 */
async function getBirdSightings({
  lat = 33.8303,
  lng = -116.5453,
  back = 7,
  dist = 5
} = {}) {
  const results = await get(
    `https://ebird.org/ws2.0/data/obs/geo/recent?lat=${lat}&lng=${lng}&back=${back}&dist=${dist}`,
    {
      headers: {
        'X-eBirdApiToken': process.env.REACT_APP_EBIRD_API_KEY
      }
    }
  );

  return uniqBy(results.data, 'locId').slice(0, 5);
}

/**
 * Returns on object of details on the top image search result for the incoming query.
 * @param {string} searchQuery - string to search for
 * @param {string} imageType - type of image - AnimatedGif,AnimatedGifHttps,Clipart,Line,Photo,Shopping,Transparent - https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference
 */
async function getTopPhoto(searchQuery, imageType = 'Clipart') {
  const results = await get(
    `${
      process.env.REACT_APP_MICROSOFT_SEARCH_API_BASE_URL
    }/bing/v7.0/images/search?q=${searchQuery}&imageType=${imageType}`,
    {
      headers: {
        'Ocp-Apim-Subscription-Key':
          process.env.REACT_APP_MICROSOFT_SEARCH_API_KEY
      }
    }
  );

  return results.data.value[0];
}

export { getBirdSightings, getTopPhoto };
