const _ = require('lodash')
const gplay = require('google-play-scraper');

let games = [];

class AppChoiceRepository {
    async getRandomChoice() {
        let hasItem = false;
        let review;
        let items;
        let selectedItem;
        while (!hasItem) {
            if (games.length === 0) {
                games.push(...(await gplay.list({
                    collection: gplay.collection.TOP_FREE_GAMES,
                    num: 100,
                    country: "ru"
                })))
            }
            items = _.sampleSize(games, 3)
            selectedItem = _.sample(items)
            try {
                let reviews = (await gplay.reviews({appId: selectedItem.appId, lang: "ru", num: 100})).data;
                if (reviews !== undefined && reviews.length > 0) {
                    hasItem = true
                    review = _.sample(reviews)
                }
            } catch (e) {
                console.error(e)
            }
        }

        return {
            items: items.map(function (item) {
                return {title: item.title, imgUrl: item.icon}
            }),
            review: {
                title: review.title,
                text: review.text,
                star: review.score,
                app: {
                    title: selectedItem.title,
                    imgUrl: selectedItem.icon
                }
            }
        }
    }
}

module.exports = {
    AppChoiceRepository
}