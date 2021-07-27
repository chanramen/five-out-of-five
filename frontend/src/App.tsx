import React from 'react';
import './App.css';
import * as _ from 'lodash';
import AppChoiceRepository, {RandomChoice, App as AppModel} from "./data/AppChoiceRepository";
import ChoiceItem from "./components/ChoiceItem";
import ReviewItem from "./components/ReviewItem";

interface AppState {
    currentChoice?: RandomChoice
    isLoading: boolean
    correctCount: number
}

class App extends React.Component<{}, AppState> {
    private repo = new AppChoiceRepository();

    constructor(props: {}) {
        super(props);
        this.state = {
            isLoading: false,
            correctCount: 0
        }
    }

    componentDidMount() {
        this.loadNextChoice()
    }

    private async loadNextChoice() {
        this.setState({
            isLoading: true
        })
        let choice = await this.repo.getRandomChoice()
        this.setState({
            currentChoice: choice
        })
        this.setState({
            isLoading: false
        })
    }

    render() {
        return (
            <div className="App">
                <div>Correct count: {this.state.correctCount}</div>
                {!this.state.isLoading && this.state.currentChoice != null && <div className="choices-container">
                    {this.state.currentChoice.items.map((item) => ChoiceItem({app: item, onClick: this.handleClick.bind(this)}))}
                </div>}
                {!this.state.isLoading && this.state.currentChoice != null && <div>
                    <ReviewItem review={this.state.currentChoice.review}/>
                </div>}
            </div>
        );
    }


    private handleClick(app: AppModel) {
        console.log(`selected ${JSON.stringify(app)},\ncorrect ${JSON.stringify(this.state.currentChoice?.review.app)}`)
        let isCorrect = _.isEqual(this.state.currentChoice?.review?.app, app)
        if (isCorrect) {
            this.setState({
                correctCount: this.state.correctCount + 1
            })
        }
        this.loadNextChoice()
    }
}

export default App;
