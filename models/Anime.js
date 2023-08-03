const fs = require('fs');
const path = require('path');

class Anime {
  static dataSourcePath = path.join(__dirname, '..', 'data', 'animes.json');

  constructor(data) {
    this.id = data.id; // incremental number from 1
    this.title = data.title;
    this.enTitle = data.enTitle;
    this.description = data.description;
    this.rating = data.rating;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.subType = data.subType;
    this.status = data.status;
    this.posterImage = data.posterImage;
    this.coverImage = data.categories;
    this.categories = data.categories;
  }

  static fetchAll() {
    try {
      const animes = JSON.parse(fs.readFileSync(Anime.dataSourcePath));
      return animes;
    } catch (e) {
      console.log('fetch animes from file failed because of error: ', e);
    }
    return ["test"];
  }

  static findById(id) {
    const animes = this.fetchAll();
    // return anime or undefined if not found
    return animes.find((anime) => anime.id === id);
  }

  save() {
    const animes = Anime.fetchAll();
    if (this.id == null) {
      // save a new animess
      this.id = animes[animes.length - 1].id + 1;
      animes.push(this);
      // could throw exception if write fails
      fs.writeFileSync(Anime.dataSourcePath, JSON.stringify(animes));
    } else {
      const idx = animes.findIndex((anime) => anime.id === this.id);
      if (idx === -1) {
        throw new Error(
          'update failed: not found anime id in the existing animes',
        );
      } else {
        animes[idx] = this;
        fs.writeFileSync(Anime.dataSourcePath, JSON.stringify(animes));
      }
    }
  }
}

module.exports = Anime;
