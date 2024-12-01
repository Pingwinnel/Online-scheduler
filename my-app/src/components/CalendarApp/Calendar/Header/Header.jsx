import React from 'react';
import Controls from "../Controls/Controls";
import monthOfYear from "../../../utils/monthOfYear";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {

    const monthsOfYear = monthOfYear
    const { currentYear, currentMonth } = useSelector((state) => state.calendar);

    return (
        <div>
            <h1 className="heading">Calendar</h1>
            <div className="navigate-date">
                <h2 className="month">{monthsOfYear[currentMonth]},</h2>
                <h2 className="year">{currentYear}</h2>
                <Controls></Controls>
            </div>
        </div>
    );
};

export default Header;