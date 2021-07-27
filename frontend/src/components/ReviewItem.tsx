import {Review} from "../data/AppChoiceRepository";

function ReviewItem(props: {review: Review}) {
    return <div className="review-item">
        {props.review.title != null && <div>
            {props.review.title}
        </div>}
        <div>
            {props.review.text}
        </div>
        <div>{props.review.star}/5</div>
    </div>
}

export default ReviewItem