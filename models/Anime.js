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
      const animes = JSON.parse(fs.readFileSync(this.dataSourcePath));
      return animes;
    } catch (e) {
      console.log('fetch animes from file failed because of error: ', e);
      return [];
    }
  }

  save() {

  }
}

module.exports = Anime;
