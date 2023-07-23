const axios = require('axios');

const BASE_URL = 'https://kitsu.io/api/edge';
const kitsuClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

module.exports.getTrendingAnimes = async (count = 50) => {
  const queryParameter = new URLSearchParams({
    limit: count,
  });
  try {
    const trendingAnimes = await kitsuClient(
      `/trending/anime?${queryParameter}`,
    );

    return trendingAnimes.data.data;
  } catch (e) {
    console.log(`fetch trending animes from Kitsu API failed with error: ${e}`);
    return [];
  }
};

module.exports.getCategories = async (id) => {
  try {
    const categories = await kitsuClient(`/anime/${id}/categories`);
    return categories.data.data;
  } catch (e) {
    console.log(
      `fetch categories with Kitsu anime id ${id} from Kitsu API failed with error: ${e}`,
    );
    return [];
  }
};
