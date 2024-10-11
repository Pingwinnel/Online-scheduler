import styled from "styled-components";

export const CellWrapper = styled.div`
	min-height: ${props => props.isHeader ? 24 : 94}px;
	min-width: 120px;
	background-color: ${props => props.isWeekday ? '#27282A' : '#1E1F21'};
	color: ${props => props.isSelectedMonth ? '#DDDDDD' : '#555759'};
`;

export const RowInCell = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
	${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;

export  const ShadowWrapper = styled('div')`
  min-width: 850px;
  height: 702px;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;
`;

export const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: #4D4C4D;
    border-bottom: 1px solid #4D4C4D;
`;

export const DayWrapper = styled.div`
	height: 31px;
	width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
	cursor: pointer;
;`



