const app = require('./app');
const fs = require('fs');
const Anime = require('./models/Anime');
const animeService = require('./services/animeService');

const port = process.env.PORT || 3000;

// fetch and save the initial anime list before the server starts if the animes data file not exists
if (!fs.existsSync(Anime.dataSourcePath)) {
  animeService.fetchAndSaveInitialAnimes().then(() => {
    console.log('fetching initial anime list from Kitsu APIs successfully')
    app.listen(port, () => {
      console.log(`app running on port ${port}`);
    });
  });
} else {
  {
    app.listen(port, () => {
      console.log(`app running on port ${port}`);
    });
  }
}
