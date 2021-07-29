import "./ScoreView.css"
function ScoreView(props: {total: number, right: number}) {
    return <div className="score-view-container">
        <div className="score-view-right score-view-text">{props.right}</div>
        <div className="score-view-total score-view-text">{props.total}</div>
    </div>
}

export default ScoreView