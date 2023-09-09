const Anime = require('../models/Anime');

const mapFromKitsuAnimeToAnime = (kitsuAnime) => {
  const data = {};
  data.title = kitsuAnime.attributes.canonicalTitle;
  data.enTitle = kitsuAnime.attributes.titles.en;
  data.description = kitsuAnime.attributes.description;
  data.rating = Number.parseFloat(kitsuAnime.attributes.averageRating);
  data.startDate = kitsuAnime.attributes.startDate;
  data.endDate = kitsuAnime.attributes.endDate;
  data.subtype = kitsuAnime.attributes.subtype;
  data.status = kitsuAnime.attributes.status;
  data.posterImage = kitsuAnime.attributes.posterImage.large;
  data.coverImage = kitsuAnime.attributes.coverImage ? kitsuAnime.attributes.coverImage.small : null;
  data.episodeCount = kitsuAnime.attributes.episodeCount;
  data.categories = kitsuAnime.categories.map((kitsuCategory) => {
    return kitsuCategory.attributes.title;
  });

  return new Anime(data);
};

module.exports.mapFromKitsuAnimeToAnime = mapFromKitsuAnimeToAnime;