import type {IAppItem, IReviewsItem} from "google-play-scraper";
import gplay, {category} from "google-play-scraper";

import _ from "lodash";

const games: IAppItem[] = [];

interface App {
    title: string
    imgUrl: string
}

interface Review {
    title: string
    text: string
    star: number
    app: App
}

interface GameData {
    items: App[]
    review: Review
}

class AppChoiceRepository {
    async getRandomChoice(): Promise<GameData> {
        let hasItem = false;
        let review;
        let items;
        let selectedItem;
        while (!hasItem) {
            if (games.length === 0) {
                games.push(...(await gplay.list({
                    collection: gplay.collection.TOP_GROSSING_GAMES,
                    num: 100,
                    country: "ru",
                    category: category.GAME
                })))
            }
            items = _.sampleSize(games, 3)
            selectedItem = _.sample(items)
            try {
                // @ts-ignore
                let reviews: IReviewsItem[] | undefined = (await gplay.reviews({appId: selectedItem.appId, lang: "ru", num: 100})).data;
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

export default AppChoiceRepository