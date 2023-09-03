class NotFoundError extends Error {
  constructor(animeId) {
    super(`Anime with id ${animeId} was not found`);
    this.animeId = animeId;
    this.name = this.constructor.name;
  }
}

module.exports = NotFoundError;