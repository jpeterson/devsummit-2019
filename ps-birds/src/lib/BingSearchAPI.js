import { get } from 'axios';

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

export default getTopPhoto;
