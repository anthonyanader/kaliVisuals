class Tweet {
    constructor({ id, content, date, sentiment }){
        this.id = id;
        this.content = content;
        this.date = date;
        this.sentiment = sentiment;
    }
}

module.exports = Tweet;