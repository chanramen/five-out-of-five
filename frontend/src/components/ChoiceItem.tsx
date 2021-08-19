import React from "react";
import {App} from "../data/AppChoiceRepository";
import styled from "styled-components";

const ChoiceItemText = styled.div`
  font-family: Lobster;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: white;
  padding: 16px;
`

const ChoiceItemImage = styled.img`
  max-width: 20vw;
  border-radius: 16px 16px 0 0;
`

const ChoiceItemWrapper = styled.div`
  max-width: 20vw;
  display: inline-block;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  margin-left: 16px;
  margin-right: 16px;
`

function ChoiceItem(props: { app: App, onClick: (app: App) => void }) {
    return <ChoiceItemWrapper onClick={() => props.onClick(props.app)}>
        <ChoiceItemImage src={props.app.imgUrl} alt={props.app.title}/>
        <ChoiceItemText>
            {props.app.title}
        </ChoiceItemText>
    </ChoiceItemWrapper>
}

export default ChoiceItem