import React from "react";
import {App} from "../data/AppChoiceRepository";

function ChoiceItem(props: { app: App, onClick: (app: App) => void }) {
    return <div className="choice-item" onClick={() => props.onClick(props.app)}>
        <div>
            {props.app.title}
        </div>
        <img className="choice-item-image" src={props.app.imgUrl}/>
    </div>
}

export default ChoiceItem