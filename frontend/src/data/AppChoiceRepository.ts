import axios from "axios";

type App = {
    title: string
    imgUrl: string
}

type Review = {
    title?: string,
    text: string,
    star: number,
    app: App
}

type RandomChoice = {
    items: App[]
    review: Review
}

class AppChoiceRepository {
    async getRandomChoice(): Promise<RandomChoice> {
        return (await axios.get("http://fivestars.tgrounds.xyz/api/get-choice")).data
    }
}

export type {RandomChoice, App, Review}
export default AppChoiceRepository