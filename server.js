const app = require('./app');
const animeController = require('./controllers/animeController');
const Anime = require('./models/Anime');

const port = process.env.PORT || 3000;

// call animeController's method to
// fetch and save the initial anime list before the server starts
animeController.fetchAndSaveInitialAnimes().then(() => {
  app.listen(port, () => {
    console.log(`app running on port ${port}`);
  });
});
