import React, {Suspense} from 'react';
import * as _ from 'lodash';
import AppChoiceRepository, {RandomChoice, App as AppModel} from "./data/AppChoiceRepository";
import ScoreView from "./components/ScoreView";
import UserDataRepository from "./data/UserDataRepository";
import styled from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
`

const ReviewItem = React.lazy(() => import("./components/ReviewItem"));
const ChoiceItem = React.lazy(() => import("./components/ChoiceItem"));

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
            <AppWrapper>
                <ScoreView total={this.state.maxGuessed} right={this.state.correctCount}/>
                {!this.state.isLoading && this.state.currentChoice != null && <div className="choices-container">
                    {this.state.currentChoice.items.map((item) => <Suspense fallback={<div/>} key={item.title}>
                        <ChoiceItem app={item}
                                    onClick={this.handleClick.bind(this)}/>
                    </Suspense>)}
                </div>}
                {!this.state.isLoading && this.state.currentChoice != null && <div>
                    <Suspense fallback={<div/>}>
                        <ReviewItem review={this.state.currentChoice.review}/>
                    </Suspense>
                </div>}
            </AppWrapper>
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
