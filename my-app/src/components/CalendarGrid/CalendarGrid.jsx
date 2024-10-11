import React from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: #4D4C4D;
  border-bottom: 1px solid #4D4C4D;
`;

const CellWrapper = styled.div`
  min-height: ${(props) => (props.isHeader ? 24 : 94)}px;
  min-width: 120px;
  background-color: ${(props) => (props.isWeekday ? '#27282A' : '#1E1F21')};
  color: ${(props) => (props.isSelectedMonth ? '#DDDDDD' : '#555759')};
`;

export const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
  ${(props) => props.pr && `padding-right: ${props.pr * 8}px`};
`;

const DayWrapper = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`;

const CalendarGrid = ({ startDay }) => {
  if (!startDay) {
    console.error('startDay is not defined');
    return null;
  }

  const totalDays = 42;
  const day = startDay.clone();
  const daysArray = [...Array(totalDays)].map(() => {
    const currentDay = day.clone();
    day.add(1, 'day');
    return currentDay;
  });

  return (
    <GridWrapper>
      {daysArray.map((dayItem, index) => (
        <CellWrapper
          key={index}
          isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
          isSelectedMonth={dayItem.month() === startDay.month()}
        >
          <RowInCell>
            <DayWrapper>{dayItem.format('D')}</DayWrapper>
          </RowInCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};

export default CalendarGrid;
