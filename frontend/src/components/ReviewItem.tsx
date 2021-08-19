import {Review} from "../data/AppChoiceRepository";
import star from "../img/star.svg"
import starFilled from "../img/star_filled.svg"
import styled from "styled-components";


const ReviewText = styled.div`
  color: #FFFFFF;
  font-family: Lobster;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 45px;
  padding: 12px;
`

const ReviewItemContainer = styled.div`
  max-width: 1024px;
  padding-left: 5vw;
  margin-left: 10vw;
  margin-right: 10vw;
  padding-right: 5vw;
  background: rgba(255, 255, 255, 0.2);
  min-height: 25vh;
`

const ReviewStar = styled.img`
  margin-left: 12px;
  margin-right: 12px;
`

const ReviewContainer = styled.div`
  margin-top: 10vh;
`

const StartContainer = styled.div`
  margin-bottom: 24px;
`

function ReviewItem(props: { review: Review }) {

    return <ReviewContainer>
        <StartContainer>
            {
                Array.from({length: 5}, (_, i: number) => ({enabled: i < props.review.star, index: i}))
                    .map((item) => {
                        return <ReviewStar alt="" key={item.index}
                                           src={item.enabled ? starFilled : star}/>;
                    })
            }
        </StartContainer>
        <ReviewItemContainer>
            <ReviewText>
                {props.review.text}
            </ReviewText>
        </ReviewItemContainer>
    </ReviewContainer>
}

export default ReviewItem