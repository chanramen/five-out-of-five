import React from "react";
import {App} from "../data/AppChoiceRepository";

function ChoiceItem(props: { app: App, onClick: (app: App) => void }) {
    return <div className="choice-item" onClick={() => props.onClick(props.app)}>
        <img className="choice-item-image" src={props.app.imgUrl} alt={props.app.title}/>
        <div className="choice-item-text">
            {props.app.title}
        </div>
    </div>
}

export default ChoiceItem