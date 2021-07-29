import {Review} from "../data/AppChoiceRepository";

function ReviewItem(props: {review: Review}) {
    return <div className="review-item-container">
        <div className="review-item-content">
            <div className="review-item-text">
                {props.review.text}
            </div>
        </div>
    </div>
}

export default ReviewItem