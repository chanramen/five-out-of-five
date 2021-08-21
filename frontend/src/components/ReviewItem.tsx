import {Review} from "../data/AppChoiceRepository";
import star from "../img/star.svg"
import starFilled from "../img/star_filled.svg"
import styled from "styled-components";
import share from "../img/share.svg"
import ShareRepository from "../data/ShareRepository";


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
  margin-left: 10vw;
  margin-right: 10vw;
`

const StartContainer = styled.div`
  margin-bottom: 24px;
`

const ShareButton = styled.img`
  float: right;
  position: relative;
  right: -2.5vw;
  top: 2.5vw;
  background: rgba(255, 255, 255);
  width: 2.5em;
  height: 2.5em;
  padding: 0.5em;
  border-radius: 2.5em;
`

const shareRepository = new ShareRepository()

const SHARE_TARGET_ID = "share-target"

function ReviewItem(props: { review: Review }) {

    async function shareReview() {
        let root = document.getElementById(SHARE_TARGET_ID)
        if (root != null) {
            root.style.background = "linear-gradient(248.66deg, #140284 16.67%, #FF0099 100%) fixed"
        }

        await shareRepository.shareHtmlTargetById(SHARE_TARGET_ID)
        if (root != null) {
            root.style.background = ""
        }
    }

    return <ReviewContainer>
        <ShareButton src={share} onClick={() => shareReview()}/>
        <div id={SHARE_TARGET_ID}>
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
        </div>
    </ReviewContainer>
}

export default ReviewItem