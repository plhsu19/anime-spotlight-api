const fs = require('fs');
const path = require('path');
const NotFoundError = require('../errors/notFoundError');

class Anime {
  static dataSourcePath = path.join(__dirname, '..', 'data', 'animes.json');

  constructor(data) {
    this.id = data.id ?? null; // automatically incremental number from 1
    this.title = data.title ?? null;
    this.enTitle = data.enTitle ?? null;
    this.description = data.description ?? null;
    this.rating = data.rating ?? null;
    this.startDate = data.startDate ?? null;
    this.endDate = data.endDate ?? null;
    this.subtype = data.subtype ?? null;
    this.status = data.status ?? null;
    this.posterImage = data.posterImage ?? null;
    this.coverImage = data.coverImage ?? null;
    this.episodeCount = data.episodeCount ?? null;
    this.categories = data.categories ?? null;
  }

  // method to return all animes or empty array
  static findAll() {
    let animes = [];
    try {
      animes = JSON.parse(fs.readFileSync(Anime.dataSourcePath));
      return animes;
    } catch (e) {
      console.warn('fetch animes from data file failed because of error: ', e);
      if (e.code !== 'ENOENT') throw e;
    }
    return animes;
  }

  // return the anime with id or null if not found
  static findById(id) {
    const animes = this.findAll();
    if (animes.length === 0 || id > animes[-1]?.id) return null;
    return animes.find((anime) => anime.id === id) ?? null;
  }

  static deleteById(id) {
    const animes = this.findAll();
    if (animes.length === 0 || id > animes[-1]?.id) {
      throw new NotFoundError(id);
    }
    const idx = animes.findIndex((anime) => anime.id === id);
    if (idx === -1) {
      throw new NotFoundError(id);
    } else {
      animes.splice(idx, 1);
      fs.writeFileSync(Anime.dataSourcePath, JSON.stringify(animes));
    }
  }

  save() {
    const animes = Anime.findAll();
    if (this.id == null) {
      // save a new anime
      this.id = animes.length > 0 ? animes[animes.length - 1].id + 1 : 1;
      animes.push(this);
      // could throw exception if write fails
      fs.writeFileSync(Anime.dataSourcePath, JSON.stringify(animes));
    } else {
      // update an existing anime
      if (animes.length === 0 || this.id > animes[-1]?.id) {
        throw new NotFoundError(this.id);
      }
      const idx = animes.findIndex((anime) => anime.id === this.id);
      if (idx === -1) {
        throw new NotFoundError(this.id);
      } else {
        animes[idx] = this;
        fs.writeFileSync(Anime.dataSourcePath, JSON.stringify(animes));
      }
    }
    return this;
  }
}

module.exports = Anime;
