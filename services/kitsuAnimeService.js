const axios = require('axios');

const BASE_URL = 'https://kitsu.io/api/edge';
const kitsuClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  },
});

const getTrendingAnimes = async (count = 50) => {
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

const getCategories = async (id) => {
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

const getTrendingAnimesWithCategories = async (count = 50) => {
  let trendingAnimes = await getTrendingAnimes(count);

  // loop through kitsu animes call service.getCategories to fetch the
  // categories for each anime

  // 1. synchronous way
  // for (const trendingAnime of trendingAnimes) {
  //   const id = trendingAnime.id;
  //   const categories = await this.getCategories(id);
  //   trendingAnime.categories = categories;
  // }

  // 2. asynchronous way
  trendingAnimes = await Promise.all(
    trendingAnimes.map(async (trendingAnime) => {
      const id = trendingAnime.id;
      const categories = await getCategories(id);
      trendingAnime.categories = categories;
      return trendingAnime;
    }),
  );
  return trendingAnimes;
};

module.exports.getTrendingAnimes = getTrendingAnimes;
module.exports.getCategories = getCategories;
module.exports.getTrendingAnimesWithCategories = getTrendingAnimesWithCategories;
module.exports.BASE_URL = BASE_URL;
