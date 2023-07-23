const kitsuAnimeService = require('../services/kitsuAnimeService');

module.exports.fetchAndSaveInitialAnimes = async () => {
  let trendingAnimes = await kitsuAnimeService.getTrendingAnimes(10);
  // loop through kitsu animes call service.getCategories to fetch the
  // categories for each anime
  // 1. synchronous way
  // for (const trendingAnime of trendingAnimes) {
  //     const id = trendingAnime.id;
  //     const categories = await kitsuAnimeService.getCategories(id);
  //     trendingAnime.categories = categories;
  // }
  // 2. asynchronous way
  trendingAnimes = await Promise.all(
    trendingAnimes.map(async (trendingAnime) => {
      const id = trendingAnime.id;
      const categories = await kitsuAnimeService.getCategories(id);
      trendingAnime.categories = categories;
      return trendingAnime;
    }),
  );

  // loop through the array and iteratively call the helper to map from kitsu animes to animes
  // save the animes via anime object’s save method
};
