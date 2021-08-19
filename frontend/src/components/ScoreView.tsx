import styled from "styled-components";

const ScoreViewContainer = styled.div`
  position: absolute;
  top: 6vw;
  left: 4vw
`
const ScoreViewText = styled.div`
  color: white;
  font-family: Lobster;
  font-size: 64px;
`

const MaxScoreViewText = styled(ScoreViewText) `
  color: rgba(255, 255, 255, 0.5);
`

function ScoreView(props: {total: number, right: number}) {
    return <ScoreViewContainer>
        <ScoreViewText>{props.right}</ScoreViewText>
        <MaxScoreViewText>{props.total}</MaxScoreViewText>
    </ScoreViewContainer>
}

export default ScoreView