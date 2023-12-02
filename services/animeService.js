const kitsuAnimeService = require('./kitsuAnimeService');
const animeHelper = require('../helpers/animeHelper');

const initialAnimesLength = 100;

module.exports.fetchAndSaveInitialAnimes = async () => {
  const kitsuAnimesWithCategories =
    await kitsuAnimeService.getTrendingAnimesWithCategories(initialAnimesLength);
  // console.log(kitsuAnimesWithCategories[8].categories);

  // TODO: loop through the array and iteratively
  // TODO: call the helper to map from kitsu anime to anime
  // TODO: save the anime via anime object’s save method
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