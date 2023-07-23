class Anime {
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
}

module.exports = Anime;