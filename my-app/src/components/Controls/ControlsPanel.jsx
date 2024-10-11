import React from 'react';
import styled from "styled-components";

const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
  color: #DCDDDD;
  padding: 16px;
  position: relative;
`;

const TextWrapper = styled('span')`
  font-size: 32px;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  margin-left: 8px;
`;

const ButtonWrapper = styled('button')`
    border: unset;
    background-color: ${props => props.unPressed ? '#27282A' : '#565759'};
    border: 1px solid #565759;
    height: 20px;
    border-radius: 4px;
    color: ${props => props.unPressed ? '#a4a6a9' : '#E6E6E6'};
    outline: unset;
    cursor:pointer;
    &:not(:last-child){
        margin-right: 2px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TodayButton = styled(ButtonWrapper)`
    font-weight: bold;
`;
const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;



const ControlsPanel = () => {
    return (
        <DivWrapper>
        <div>
            <TitleWrapper>October</TitleWrapper>
            <TextWrapper>2020</TextWrapper>
        </div>
        <ButtonsWrapper>
            <ButtonWrapper onClick={console.log("prev")}>&lt;</ButtonWrapper>
            <TodayButton onClick={console.log("Today")}>Today</TodayButton>
            <ButtonWrapper onClick={console.log("next")}>&gt;</ButtonWrapper>
        </ButtonsWrapper>
        </DivWrapper>
    );
};

export default ControlsPanel;