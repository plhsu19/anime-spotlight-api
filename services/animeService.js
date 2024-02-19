const kitsuAnimeService = require('./kitsuAnimeService');
const animeHelper = require('../helpers/animeHelper');

const initialAnimesLength = 50;

module.exports.fetchAndSaveInitialAnimes = async () => {
  const kitsuAnimesWithCategories =
    await kitsuAnimeService.getTrendingAnimesWithCategories(initialAnimesLength);
  kitsuAnimesWithCategories.forEach((kitsuAnime) => {
    try {
      const anime = animeHelper.mapFromKitsuAnimeToAnime(kitsuAnime);
      anime.save();
    } catch (e) {
      console.warn(
        'Mapping from kitsu anime %s to anime object and saving it was failed due to error %s',
        kitsuAnime,
        e,
      );
    }
  });
};