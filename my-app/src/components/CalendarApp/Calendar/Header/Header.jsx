import React from 'react';
import Controls from "../Controls/Controls";
import monthOfYear from "../../../utils/monthOfYear";

const Header = ({
                    CurrentYear,
                    CurrentMonth,
                    nextMonthHandler,
                    prevMonthHandler
                }) => {

    const monthsOfYear = monthOfYear

    return (
        <div>
            <h1 className="heading">Calendar</h1>
            <div className="navigate-date">
                <h2 className="month">{monthsOfYear[CurrentMonth - 1]},</h2>
                <h2 className="year">{CurrentYear}</h2>
                <Controls nextMonthHandler={nextMonthHandler} prevMonthHandler={prevMonthHandler}></Controls>
            </div>
        </div>
    );
};

export default Header;