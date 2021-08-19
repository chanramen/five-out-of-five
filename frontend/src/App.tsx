import React from 'react';
import './App.css';
import * as _ from 'lodash';
import AppChoiceRepository, {RandomChoice, App as AppModel} from "./data/AppChoiceRepository";
import ChoiceItem from "./components/ChoiceItem";
import ReviewItem from "./components/ReviewItem";
import ScoreView from "./components/ScoreView";
import UserDataRepository from "./data/UserDataRepository";

interface AppState {
    currentChoice?: RandomChoice
    isLoading: boolean
    correctCount: number
    maxGuessed: number
}

class App extends React.Component<{}, AppState> {
    private repo = new AppChoiceRepository();
    private userDataRepo = new UserDataRepository()

    constructor(props: {}) {
        super(props);
        this.state = {
            isLoading: false,
            correctCount: 0,
            maxGuessed: this.userDataRepo.maxScore
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
                <ScoreView total={this.state.maxGuessed} right={this.state.correctCount}/>
                {!this.state.isLoading && this.state.currentChoice != null && <div className="choices-container">
                    {this.state.currentChoice.items.map((item) => <ChoiceItem app={item}
                                                                              key={item.title}
                                                                              onClick={this.handleClick.bind(this)}/>)}
                </div>}
                {!this.state.isLoading && this.state.currentChoice != null && <div>
                    <ReviewItem review={this.state.currentChoice.review}/>
                </div>}
            </div>
        );
    }


    private handleClick(app: AppModel) {
        let isCorrect = _.isEqual(this.state.currentChoice?.review?.app, app)
        if (isCorrect) {
            let correctCount = this.state.correctCount + 1
            this.setState({
                correctCount: correctCount,
            })
            if (correctCount > this.state.maxGuessed) {
                this.setState({
                    maxGuessed: correctCount
                })
                this.userDataRepo.maxScore = correctCount
            }
        } else {
            this.setState(
                {
                    correctCount: this.state.correctCount - 1
                }
            )
        }
        this.loadNextChoice()
    }
}

export default App;
